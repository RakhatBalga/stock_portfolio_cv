export interface Holding {
    ticker: string;
    total_amount: number;
    avg_price: number;
    current_price: number;
    current_value: number;
    profit_usd: number;
    profit_percent: string;
}

export interface PortfolioData {
    total_invested: number;
    current_value: number;
    total_profit_usd: number;
    holdings: Holding[];
}

export interface Transaction {
    _id: string;
    ticker: string;
    price: number;
    amount: number;
    timestamp: string;
}
