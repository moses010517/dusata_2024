from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    Boolean,
    Enum,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base
import enum
from datetime import datetime, timedelta


class GenderEnum(str, enum.Enum):
    male = "male"
    female = "female"


class HobbyEnum(str, enum.Enum):
    reading = "독서"
    cooking = "요리"
    exercise = "운동"
    travel = "여행"
    photography = "사진 찍기"
    music = "음악 감상"
    movies = "영화 감상"
    drawing = "그림 그리기"
    dance = "댄스"
    hiking = "등산"
    swimming = "수영"
    yoga = "요가"
    art = "미술"
    gaming = "게임"
    fishing = "낚시"


class MbtiEnum(str, enum.Enum):
    ISTJ = "ISTJ"
    ISFJ = "ISFJ"
    INFJ = "INFJ"
    INTJ = "INTJ"
    ISTP = "ISTP"
    ISFP = "ISFP"
    INFP = "INFP"
    INTP = "INTP"
    ESTP = "ESTP"
    ESFP = "ESFP"
    ENFP = "ENFP"
    ENTP = "ENTP"
    ESTJ = "ESTJ"
    ESFJ = "ESFJ"
    ENFJ = "ENFJ"
    ENTJ = "ENTJ"


class AnimalEnum(str, enum.Enum):
    dog = "강아지상"
    cat = "고양이상"
    bear = "곰상"
    fox = "여우상"
    rabbit = "토끼상"
    deer = "사슴상"
    tiger = "호랑이상"
    hedgehog = "고슴도치상"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String(11), unique=True, index=True)
    user_name = Column(String(50))
    user_kakao = Column(String(50))
    major = Column(String(50))
    student_number = Column(Integer)
    gender = Column(Enum("male", "female", name="gender"))
    hobby = Column(
        Enum(
            "독서",
            "요리",
            "운동",
            "여행",
            "사진 찍기",
            "음악 감상",
            "영화 감상",
            "그림 그리기",
            "댄스",
            "등산",
            "수영",
            "요가",
            "미술",
            "게임",
            "낚시",
            name="hobby",
        )
    )
    mbti = Column(
        Enum(
            "ISTJ",
            "ISFJ",
            "INFJ",
            "INTJ",
            "ISTP",
            "ISFP",
            "INFP",
            "INTP",
            "ESTP",
            "ESFP",
            "ENFP",
            "ENTP",
            "ESTJ",
            "ESFJ",
            "ENFJ",
            "ENTJ",
            name="mbti",
        )
    )
    smoke = Column(Boolean)
    animal = Column(
        Enum(
            "강아지상",
            "고양이상",
            "곰상",
            "여우상",
            "토끼상",
            "사슴상",
            "호랑이상",
            "고슴도치상",
            name="animal",
        )
    )
    introduce = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
    is_deleted = Column(Boolean, default=False)

    auth_phones = relationship("AuthPhone", back_populates="user")


class Match(Base):
    __tablename__ = "match"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    responder_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(
        Enum("reject", "waiting", "accept", "none"), nullable=False, default="none"
    )
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    requester = relationship("User", foreign_keys=[requester_id])
    responder = relationship("User", foreign_keys=[responder_id])


class AuthPhone(Base):
    __tablename__ = "auth_phone"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    phone_number = Column(String(11), index=True)
    verification_code = Column(String(6))
    verified = Column(Boolean, default=False)
    expires_at = Column(DateTime, default=datetime.utcnow() + timedelta(minutes=10))

    user = relationship("User", back_populates="auth_phones")


class AuthToken(Base):
    __tablename__ = "auth_token"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token_type = Column(Enum("access", "refresh"), nullable=False)
    token = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    expires_at = Column(TIMESTAMP, nullable=False)
