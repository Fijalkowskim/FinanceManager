import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Finance-Manager" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/Finance-Manager" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
