import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Finance-Manager" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/Finance-Manager" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
