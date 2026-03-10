from beanie import Document 
from datetime import datetime
from pydantic import Field 

class Transaction(Document):
    ticker: str = Field(..., example="AAPL")
    price: float
    amount: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Settings: 
        name = "Transaction"
