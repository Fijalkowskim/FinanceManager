import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SettingsContextProvider } from "./context/SettingsContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";
import { PlannedExpensesContextProvider } from "./context/PlannedExpenseContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ExpensesContextProvider>
        <PlannedExpensesContextProvider>
          <App />
        </PlannedExpensesContextProvider>
      </ExpensesContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
