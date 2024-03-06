import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SettingsContextProvider } from "./context/SettingsContext";
import { ExpensesContextProvider } from "./context/ExpensesContext";
import { PopupContextProvider } from "./context/PopupContext";
import { ExpenseHistoryContextProvider } from "./context/ExpenseHistoryContext";
import { AnalyticsContextProvider } from "./context/AnalyticsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ExpensesContextProvider>
        <PopupContextProvider>
          <ExpenseHistoryContextProvider>
            <AnalyticsContextProvider>
              <App />
            </AnalyticsContextProvider>
          </ExpenseHistoryContextProvider>
        </PopupContextProvider>
      </ExpensesContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
