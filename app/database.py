from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from databases import Database

DATABASE_URL = "mysql+aiomysql://root:KAnwhjyQokRCuZkA@210.109.55.155/dusata"

connect_args = {"init_command": "SET time_zone = 'Asia/Seoul'"}

database = Database(DATABASE_URL)

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession
)
Base = declarative_base()


async def get_db():
    async with SessionLocal() as session:
        yield session
