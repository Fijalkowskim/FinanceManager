import React, { useState } from "react";
import MontlySpendings from "../components/dashboard/MontlySpendings";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div className="mt-20 flex flex-col items-center justify-start gap-4 p-2">
      <MontlySpendings />
    </div>
  );
}

export default Dashboard;
