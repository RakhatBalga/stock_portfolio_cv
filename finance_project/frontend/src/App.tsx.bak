import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

type Page = "dashboard" | "login" | "register";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("dashboard");

  const navigate = (to: Page) => setPage(to);

  switch (page) {
    case "login":
      return <Login onNavigate={navigate} />;
    case "register":
      return <Register onNavigate={navigate} />;
    default:
      return <Dashboard />;
  }
};

export default App;
