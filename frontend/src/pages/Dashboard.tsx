import React, { useState } from "react";
import MontlySpendings from "../components/dashboard/MontlySpendings";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2 lg:-mt-4 min-h-screen w-screen ">
      <MontlySpendings />
    </div>
  );
}

export default Dashboard;
