import React from "react";
import MonthlyExpenses from "../components/montly-expenses/MonthlyExpenses";
import UpcomingExpenses from "../components/upcoming-expenses/UpcomingExpenses";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-start gap-4 p-2  min-h-screen w-screen lg:w-fit mx-auto pb-16">
      <h1 className="p-1 rounded-md shadow-sm bg-action-400 max-w-xl text-center">
        This is a demo version, any entered expenses are not saved between
        sessions, as the API is not currently hosted.
      </h1>
      <UpcomingExpenses />
      <MonthlyExpenses />
    </div>
  );
}

export default Dashboard;
