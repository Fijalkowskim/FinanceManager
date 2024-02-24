import React, { useEffect, useState } from "react";
import { useExpensesContext } from "../../context/ExpensesContext";
import { ExpenseData } from "../../models/ExpenseData";
import { dateToMonthName } from "../../helpers/helpers";
import dateFormat from "dateformat";
import { DashboardData } from "../../models/DashboardData";
import MonthChart from "./MonthChart";

function MontlySpendings() {
  const { GetMontlyExpenses, GetMontlyDashbord } = useExpensesContext();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const LoadExpenses = async () => {
      const data = await GetMontlyDashbord(date);
      setDashboardData(data);
    };
    LoadExpenses();
  }, [GetMontlyExpenses, setDashboardData, date]);
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-background-50 rounded-md shadow-md max-w-full text-center">
      <h1 className="text-4xl uppercase ">Your monthly spendings</h1>
      <p className="text-xl text-primary-600 mb-4">
        {dateToMonthName(date)} {date.getFullYear()}
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-full">
        <div className="flex flex-col items-center lg:items-end justify-center text-xl text-primary-700 ">
          <h2>Total:</h2>
          <p className="text-3xl text-primary-950 mb-2">
            {dashboardData
              ? `${dashboardData?.monthlySpending.toFixed(2)}$`
              : "-"}
          </p>
          <h2>Top category:</h2>
          <p className="text-3xl text-primary-950">
            {dashboardData ? `${dashboardData?.topCategory.category}` : "-"}
          </p>
          <p className="text-xl text-primary-950 mb-2">
            {dashboardData && dashboardData?.topCategory.cost.toFixed(2)}$
          </p>
        </div>
        <MonthChart
          title={dateToMonthName(date)}
          costPerCategory={dashboardData?.costPerCategory}
        />
      </div>
    </div>
  );
}

export default MontlySpendings;
