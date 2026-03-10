# Stock Portfolio Tracker 📈

A modern full-stack web application designed to track personal stock investments. It calculates real-time portfolio metrics, profitability, and tracks individual holding performance using live market data.

This project demonstrates a clear separation of concerns with a RESTful API backend and a reactive, component-based frontend.

![Portfolio Screenshot](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2670&auto=format&fit=crop) _(Placeholder)_

## 🚀 Features

- **Real-Time Market Data**: Integrates with `yfinance` to fetch live stock prices and calculate up-to-date asset values.
- **Portfolio Analytics**: Automatically calculates Total Invested, Current Portfolio Value, and Total Profit/Loss (both in USD and percentages).
- **CRUD Operations**: Complete management (Create, Read, Update, Delete) of individual stock transactions.
- **Smart Grouping**: Aggregates multiple transactions of the same ticker to show average buy price and total holdings.
- **Responsive UI**: Built with Tailwind CSS, featuring a modern dark-mode aesthetic with conditional profit/loss coloring.

## 🛠️ Technology Stack

**Backend**

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python) for high-performance, asynchronous REST endpoints.
- **Database**: **MongoDB Atlas** (NoSQL cloud database).
- **ODM / Data Validation**: [Beanie](https://beanie-odm.dev/) & **Pydantic** for asynchronous database operations and strict type checking.
- **External API**: `yfinance` for live stock market quotes.

**Frontend**

- **Library**: **React.js** (Functions components & Hooks).
- **Build Tool**: **Vite** for blazing fast compilation and Hot Module Replacement.
- **Styling**: **Tailwind CSS v4** for utility-first responsive design.
- **HTTP Client**: **Axios** for API communication.

## 📂 Architecture overview

The application uses a standard client-server architecture:

```text
finance_project/
├── backend/                  # FastAPI Application
│   ├── main.py               # API Router, endpoints, business logic, CORS
│   ├── database.py           # MongoDB connection lifecycle using Motor
│   └── models.py             # Beanie/Pydantic Database schemas
├── frontend/                 # React Application
│   ├── src/api/axios.js      # Global Axios config pointing to backend
│   ├── src/components/       # Reusable, dumb UI components (Buttons, Rows)
│   ├── src/modules/          # Smart widgets handling specific data domains
│   └── src/App.jsx           # Application state orchestrator
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.9+
- A MongoDB Atlas cluster URI (or local MongoDB instance)

### 1. Backend Setup

```bash
# Navigate to project root
cd finance_project

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your MongoDB URL
echo "MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio" > .env

# Run the FastAPI server (starts on http://localhost:8000)
fastapi dev backend/main.py
```

### 2. Frontend Setup

```bash
# Open a new terminal tab and navigate to the frontend folder
cd finance_project/frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` to view the application!

## 💡 Key Design Decisions

- **Error Handling**: Implemented graceful degradation. If Yahoo Finance fails to fetch a particular ticker/price, the backend elegantly falls back to the original purchase price (resulting in $0 profit) rather than crashing the entire portfolio page.
- **Asynchronous DB**: Utilized `Motor` via `Beanie` in Python to prevent I/O blocking during database transactions, fully leveraging FastAPI's async capabilities.
- **Component Modularity**: Frontend features are split into `modules` (state-aware logical blocks) and `components` (pure UI elements) for high maintainability.

## 👤 Author

- **Rakhat Balgabekov**
