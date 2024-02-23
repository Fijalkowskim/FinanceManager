import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SettingsContextProvider } from "./components/SettingsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </React.StrictMode>
);
