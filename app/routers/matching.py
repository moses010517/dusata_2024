from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.dependencies import get_current_user
from app.database import get_db
from app import schemas, crud

router = APIRouter()


@router.get("/matching/status", response_model=str)
async def get_matching_status(
    current_user: schemas.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # 현재 사용자의 매칭 상태를 가져오는 함수 호출
    status = await crud.get_matching_status(db, current_user.id)
    return status
