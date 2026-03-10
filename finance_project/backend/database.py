import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv
import models

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

MONGO_URL = os.getenv("MONGO_URL")

async def init_db():
    client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())
    await init_beanie(database=client.finance_db, document_models=[models.Transaction])
