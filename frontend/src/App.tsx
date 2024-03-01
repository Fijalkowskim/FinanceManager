import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useSettingsContext } from "./context/SettingsContext";
import Analize from "./pages/Analize";
import History from "./pages/History";
import AddExpense from "./pages/AddExpense";
import PlannedExpenses from "./pages/PlannedExpenses";
import PopupController from "./components/general/PopupController";

function App() {
  const { disableScroll } = useSettingsContext();

  useEffect(() => {
    document.body.style.overflow = disableScroll ? "hidden" : "unset";
  }, [disableScroll]);
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <PopupController />
        <Navbar />
        <div className="mb-16" />
        <Routes>
          <Route path="/Finance-Manager" element={<Dashboard />} />
          <Route path="/Finance-Manager/analize" element={<Analize />} />
          <Route path="/Finance-Manager/history" element={<History />} />
          <Route
            path="/Finance-Manager/planned"
            element={<PlannedExpenses />}
          />
          <Route path="/Finance-Manager/add" element={<AddExpense />} />
          <Route
            path="/Finance-Manager/plan"
            element={<AddExpense planned />}
          />
          <Route
            path="/Finance-Manager/edit/:id"
            element={<AddExpense edit />}
          />
          <Route
            path="/Finance-Manager/edit-planned/:id"
            element={<AddExpense edit planned />}
          />
          <Route path="*" element={<Navigate to="/Finance-Manager" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
