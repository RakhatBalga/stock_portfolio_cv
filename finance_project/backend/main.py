from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from beanie import PydanticObjectId 
from typing import List
import yfinance as yf
import models
from database import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.post("/transactions", response_model=models.Transaction)
async def create_transaction(transaction: models.Transaction):
    await transaction.insert()
    return transaction

@app.get("/transactions", response_model=List[models.Transaction])
async def get_transactions():
    return await models.Transaction.find_all().to_list()

@app.get("/transactions/{id}", response_model=models.Transaction)
async def get_transaction(id: PydanticObjectId):
    transaction = await models.Transaction.get(id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found.")
    return transaction

@app.delete("/transactions/{id}") 
async def delete_transaction(id: PydanticObjectId):
    transaction = await models.Transaction.get(id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Nothing to delete.")
    await transaction.delete()
    return {"message": "Deleted successfully"}

@app.delete("/transactions/ticker/{ticker}")
async def delete_by_ticker(ticker: str):
    transactions = await models.Transaction.find(models.Transaction.ticker == ticker.upper()).to_list()
    if not transactions:
        raise HTTPException(status_code=404, detail="No transactions found for this ticker.")
    for t in transactions:
        await t.delete()
    return {"message": f"Deleted {len(transactions)} transaction(s) for {ticker.upper()}"}

@app.put("/transactions/{id}", response_model=models.Transaction)
async def put_transaction(id: PydanticObjectId, data: models.Transaction):
    transaction = await models.Transaction.get(id)
    if not transaction:
        raise HTTPException(status_code=404, detail="ID not found")

    transaction.ticker = data.ticker
    transaction.amount = data.amount
    transaction.price = data.price

    await transaction.save()
    return transaction 

@app.get("/")
def read_root():
    return {"status": "FastAPI is running", "db": "Connected"}

@app.get("/portfolio/status")
async def get_portfolio_status():

    transactions = await models.Transaction.find_all().to_list()
    if not transactions:
        raise HTTPException(status_code=404, detail="No assets in portfolio")

    portfolio = {}
    for t in transactions:
        if t.ticker not in portfolio: 
            portfolio[t.ticker] = {"total_amount": 0, "total_cost": 0}

        portfolio[t.ticker]["total_amount"] += t.amount
        portfolio[t.ticker]["total_cost"] += (t.price * t.amount)

    report = []
    total_invested = 0
    current_portfolio_value = 0

    for ticker, data in portfolio.items():
        stock = yf.Ticker(ticker)

        try:
            hist = stock.history(period="1d")
            if not hist.empty and 'Close' in hist and not hist['Close'].isna().all():
                current_price = float(hist['Close'].iloc[-1])
            else:
                current_price = None
        except Exception:
            current_price = None
        
        avg_buy_price = data["total_cost"] / data["total_amount"]
        
        # If we can't get the price, assume it hasn't changed to avoid breaking the math
        if current_price is None:
            current_price = avg_buy_price
            
        current_value = data["total_amount"] * current_price
        profit_usd = current_value - data["total_cost"]
        
        total_invested += data["total_cost"]
        current_portfolio_value += current_value

        report.append({
            "ticker": ticker,
            "avg_price": round(avg_buy_price, 2),
            "current_price": round(current_price, 2),
            "profit_usd": round(profit_usd, 2),
            "profit_percent": f"{round((profit_usd / data['total_cost']) * 100, 2)}%"
        })

    return {
        "total_invested": round(total_invested, 2),
        "current_value": round(current_portfolio_value, 2),
        "total_profit_usd": round(current_portfolio_value - total_invested, 2),
        "holdings": report
    }
