# Finance Portfolio Frontend 📈

This is the frontend portion of the personal stock portfolio application. It is built using **React** and **Vite** with **Tailwind CSS v4** for styling.

## Architecture & Logic

The frontend follows a modular, component-based approach to keep the code clean and maintainable. All the logic and rendering happens inside the `src/` directory.

### Project Structure (`src/`)

- **`App.jsx`** (The Orchestrator)
  - This is the entry point of the application.
  - **State Management**: It holds the main states (`portfolio` data and `loading` status).
  - **Data Fetching**: The `loadData()` function fetches the entire portfolio data from the backend (`GET /portfolio/status`) and passes it down to child components via props.
  - **Event Handling**: Passing callbacks like `onTransactionAdded` and `handleDelete` down to child modules so they can trigger a global refresh when data changes.

- **`api/`** (Backend Communication)
  - **`axios.js`**: Configures the Axios HTTP client. It sets the `baseURL` to `http://127.0.0.1:8000` so that all API calls (like `api.get('/transactions')`) automatically point to the FastAPI backend.

- **`modules/`** (Smart Sections/Widgets)
  - Large, logical blocks of the page that handle specific user flows.
  - **`TransactionForm.jsx`**: A form for users to add new assets. On submit, it sends a `POST` request to the backend and tells `App.jsx` to refresh the data.
  - **`PortfolioSummary.jsx`**: Receives the raw portfolio numbers from `App` and renders the three main statistics cards (Total Invested, Current Value, Profit).
  - **`HoldingsTable.jsx`**: Renders the summary table of grouped assets, calculating total profit per ticker by utilizing the `StockRow` component.
  - **`TransactionsList.jsx`**: A complete CRUD table for individual transactions. It fetches its own data (`GET /transactions`), handles inline editing (`PUT`), deletion (`DELETE`), and then tells `App.jsx` to refresh the global portfolio.

- **`components/`** (Dumb/UI Components)
  - Small, reusable UI Lego bricks. They don't make API calls or manage complex states; they just render the props they receive.
  - **`StatCard.jsx`**: A reusable stylistic card showing a title, a monetary value, and conditional coloring (green/white).
  - **`StockRow.jsx`**: A reusable `<tr>` (table row) component. It takes properties like `ticker`, `price`, `profit_usd`, and dynamically applies Tailwind classes (e.g., `text-emerald-400` vs `text-red-400`) based on whether the stock is profitable or not.
  - **`Loader.jsx`**: A simple CSS-animated loading spinner.

## Data Flow (How it works in practice)

1. When the app loads, `App.jsx` mounts and calls `loadData()`.
2. A request goes through `api/axios.js` to the FastAPI backend.
3. The backend calculates real-time stock prices (via `yfinance`) and returns a structured JSON object.
4. `App.jsx` saves this JSON in the `portfolio` state variable.
5. React automatically re-renders, passing data down into `PortfolioSummary` (to show the big numbers) and `HoldingsTable` (to show the list of grouped stocks).
6. If the user edits a transaction in `TransactionsList`, a `PUT` request is sent. Upon success, `TransactionsList` calls `onUpdate()`, which triggers `App.jsx` to re-run `loadData()` and fetch the fresh portfolio totals!

## Running the Frontend Locally

```bash
# Go to the frontend directory
cd frontend

# Install dependencies (only required the first time)
npm install

# Start the Vite development server Fast Refresh enabled
npm run dev
```

The app will start at `http://localhost:5173/`.
_Ensure that the FastAPI backend is running simultaneously on `http://127.0.0.1:8000`._
