from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_current_user
from app.database import get_db
from app import schemas, crud
from sqlalchemy.future import select
from ..models import User, Match
from ..schemas import UserResponse
from typing import List
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from ..schemas import MatchRequest
from ..schemas import MatchResponse

router = APIRouter()


@router.get("/matching/status", response_model=str)
async def get_matching_status(
    current_user: schemas.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # 현재 사용자의 매칭 상태를 가져오는 함수 호출
    status = await crud.get_matching_status(db, current_user.id)
    return status


@router.get("/matching/list", response_model=List[UserResponse])
async def get_matching_list(
    current_user: User = Depends(get_current_user),  # 인증된 사용자
    db: AsyncSession = Depends(get_db),
):
    # 매칭 상태가 'none'인 사용자들 중에서 4명을 랜덤으로 가져오는 쿼리
    query = (
        select(User)
        .where(User.matching_status == "none")
        .order_by(func.random())
        .limit(4)
    )
    result = await db.execute(query)
    users = result.scalars().all()
    if not users:
        raise HTTPException(status_code=404, detail="No matching users found")
    return users


@router.get("/matching/dooyou", response_model=UserResponse)
async def get_matching_partner(
    current_user: User = Depends(get_current_user),  # 인증된 사용자
    db: AsyncSession = Depends(get_db),
):
    # 가장 최근의 매칭 정보를 가져오는 쿼리
    query = (
        select(Match)
        .options(joinedload(Match.requester), joinedload(Match.responder))
        .where(
            (Match.requester_id == current_user.id)
            | (Match.responder_id == current_user.id),
            Match.status.in_(["waiting", "accept", "reject"]),
        )
        .order_by(desc(Match.created_at))  # 가장 최근의 매칭을 가져오기 위해 정렬
    )
    result = await db.execute(query)
    match = result.scalars().first()  # 첫 번째 결과를 가져옴 (가장 최근의 매칭)

    if not match:
        raise HTTPException(status_code=404, detail="No matching partner found")

    # 상대방 정보 가져오기
    partner_id = (
        match.responder_id
        if match.requester_id == current_user.id
        else match.requester_id
    )
    partner = await db.get(User, partner_id)
    if not partner:
        raise HTTPException(status_code=404, detail="Matching partner not found")

    return partner


@router.post("/matching/request", status_code=status.HTTP_200_OK)
async def send_matching_request(
    match_request: MatchRequest,
    current_user: User = Depends(get_current_user),  # 인증된 사용자
    db: AsyncSession = Depends(get_db),
):
    # 요청한 사용자의 매칭 상태가 이미 'waiting' 또는 'accept'인 경우
    if current_user.matching_status in ["waiting", "accept"]:
        raise HTTPException(
            status_code=400, detail="You already have a pending or accepted match"
        )

    # 상대방 사용자 정보 확인
    partner = await db.get(User, match_request.partner_id)
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")

    # 매칭 요청 생성
    match = Match(
        requester_id=current_user.id,
        responder_id=match_request.partner_id,
        status="waiting",
    )
    db.add(match)

    # 요청자의 매칭 상태 업데이트
    current_user.matching_status = "waiting"
    await db.commit()

    return {"detail": "Match request sent successfully"}


@router.post("/matching/accept", status_code=status.HTTP_200_OK)
async def handle_matching_request(
    match_response: MatchResponse,
    current_user: User = Depends(get_current_user),  # 인증된 사용자
    db: AsyncSession = Depends(get_db),
):
    print(
        f"Checking match with requester ID {match_response.match_id} for user {current_user.id}"
    )

    # 매칭 요청 정보 확인
    query = select(Match).where(
        Match.requester_id == match_response.match_id,
        Match.responder_id == current_user.id,
    )
    result = await db.execute(query)
    match = result.scalar_one_or_none()

    if not match:
        print(
            f"No match found with requester ID {match_response.match_id} for user {current_user.id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Match request not found or you are not authorized to respond",
        )

    # 매칭 요청 상태 업데이트
    if match_response.accept:
        match.status = "accept"
        # 요청자의 매칭 상태 업데이트
        requester = await db.get(User, match.requester_id)
        if requester:
            requester.matching_status = "accept"
        current_user.matching_status = "accept"
    else:
        match.status = "reject"

    await db.commit()
    return {"detail": "Match request handled successfully"}
