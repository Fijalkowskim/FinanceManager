import React, { useEffect, useState } from "react";
import { ExpenseData } from "../../models/ExpenseData";
import { PlannedExpensesData } from "../../models/PlannedExpensesData";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import ExpenseCard from "../history/ExpenseCard";
import UpcomingExpenseCard from "./UpcomingExpenseCard";
import { useExpensesContext } from "../../context/ExpensesContext";
function UpcomingExpenses() {
  const [dashboardData, setDashboardData] = useState<PlannedExpensesData>();
  const { GetPlannedExpensesDashboard } = useExpensesContext();
  const [daysFromNow] = useState(7);
  const [displayedAmount] = useState(2);
  useEffect(() => {
    const LoadExpenses = async () => {
      const data: PlannedExpensesData = await GetPlannedExpensesDashboard(
        daysFromNow,
        displayedAmount
      );
      setDashboardData(data);
    };
    LoadExpenses();
  }, [
    daysFromNow,
    displayedAmount,
    GetPlannedExpensesDashboard,
    setDashboardData,
  ]);
  return (
    <div className="bg-background-50 gap-1 rounded-md shadow-sm flex flex-col items-center justify-center p-3 max-w-full w-full text-xl text-center">
      <h1>Planned expenses:</h1>
      <p className="text-sm italic -mt-2">Next {daysFromNow} days and before</p>
      {dashboardData && dashboardData.plannedExpenses.length > 0 ? (
        <>
          {dashboardData?.plannedExpenses.map((exp, idx) => (
            <UpcomingExpenseCard key={idx} expense={exp} />
          ))}
          {dashboardData.totalPlannedExpenses > displayedAmount && (
            <p className="w-full p-1 bg-primary-300 rounded-md shadow-sm max-w-2xl">
              +{dashboardData.totalPlannedExpenses - displayedAmount} MORE
            </p>
          )}
        </>
      ) : (
        <div className="text-lg text-primary-700">No planned expenses</div>
      )}
      <NavLink to="/Finance-Manager/planned">
        <CustomButton variant={"primary"} parentClass="mt-2">
          Plan expenses
        </CustomButton>
      </NavLink>
    </div>
  );
}

export default UpcomingExpenses;
