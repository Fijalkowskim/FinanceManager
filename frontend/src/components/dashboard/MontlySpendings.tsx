import React, { useEffect, useState } from "react";
import { useExpensesContext } from "../../context/ExpensesContext";
import { ExpenseData } from "../../models/ExpenseData";
import { dateToMonthName } from "../../helpers/helpers";
import dateFormat from "dateformat";
import { DashboardData } from "../../models/DashboardData";

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
    <div className="flex flex-col items-center justify-center p-3 bg-background-50 rounded-md shadow-md">
      <h1 className="text-4xl uppercase ">Your monthly spendings</h1>
      <p className="text-xl text-primary-600 mb-4">
        {dateToMonthName(date)} {date.getFullYear()}
      </p>
      <p className="text-2xl">
        Total: {dashboardData?.monthlySpending.toFixed(2)}$
      </p>
    </div>
  );
}

export default MontlySpendings;
