import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SettingsContextProvider } from "./context/SettingsContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";
import { PopupContextProvider } from "./context/PopupContext";
import { ExpenseHistoryContextProvider } from "./context/ExpenseHistoryContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ExpensesContextProvider>
        <PopupContextProvider>
          <ExpenseHistoryContextProvider>
            <App />
          </ExpenseHistoryContextProvider>
        </PopupContextProvider>
      </ExpensesContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
