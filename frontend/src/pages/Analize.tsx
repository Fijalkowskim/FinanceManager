import React from "react";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";

function Analize() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-4 text-center gap-2 p-2 pb-10 overflow-hidden w-screen">
      <h1 className="text-4xl  ">Analize expenses</h1>
      <AnalyticsDashboard />
    </div>
  );
}

export default Analize;
