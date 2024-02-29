import React, { useState } from "react";
import MontlySpendings from "../components/montly-expenses/MontlySpendings";
import UpcomingExpenses from "../components/upcoming-expenses/UpcomingExpenses";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-start gap-4 p-2  min-h-screen w-screen lg:w-fit mx-auto pb-16">
      <UpcomingExpenses />
      <MontlySpendings />
    </div>
  );
}

export default Dashboard;
