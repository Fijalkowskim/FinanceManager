import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SettingsContextProvider } from "./context/SettingsContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";
import { PlannedExpensesContextProvider } from "./context/PlannedExpenseContext";
import { PopupContextProvider } from "./context/PopupContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ExpensesContextProvider>
        <PlannedExpensesContextProvider>
          <PopupContextProvider>
            <App />
          </PopupContextProvider>
        </PlannedExpensesContextProvider>
      </ExpensesContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
