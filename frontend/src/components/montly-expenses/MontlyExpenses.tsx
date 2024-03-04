import React, { useEffect, useState } from "react";
import { useExpensesContext } from "../../context/ExpensesContext";
import { dateToMonthName } from "../../helpers/helpers";
import { DashboardData } from "../../models/analytics/DashboardData";
import CostPerCategoryChart from "../charts/CostPerCategoryChart";
import CustomButton from "../general/CustomButton";
import { NavLink } from "react-router-dom";
import { GetCategoryData } from "../../data/Categories";

function MontlyExpenses() {
  const { GetMontlyExpenses, GetMontlyDashbord } = useExpensesContext();
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [date] = useState(new Date());
  useEffect(() => {
    const LoadExpenses = async () => {
      const data = await GetMontlyDashbord(date);
      setDashboardData(data);
    };
    LoadExpenses();
  }, [GetMontlyExpenses, GetMontlyDashbord, setDashboardData, date]);
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-background-50 rounded-md shadow-md max-w-full text-center">
      <h1 className="text-4xl  ">Your monthly spendings</h1>
      <p className="text-xl text-primary-600 mb-4">
        {dateToMonthName(date)} {date.getFullYear()}
      </p>
      {/* Stats and chart */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 max-w-full mb-6">
        {dashboardData ? (
          <>
            <div className="flex flex-col items-center lg:items-end justify-center text-xl text-primary-700 ">
              <h2>Total:</h2>
              <p className="text-3xl text-primary-950 mb-2">
                {dashboardData
                  ? `${dashboardData?.monthlySpending.toFixed(2)}$`
                  : "-"}
              </p>
              <h2>Top category:</h2>
              <p className="text-3xl text-primary-950">
                {dashboardData ? (
                  <p className="flex items-center justify-center gap-1">
                    {`${dashboardData?.topCategory.category}`}
                    <p className="text-xl">
                      {GetCategoryData(dashboardData.topCategory.category).icon}
                    </p>
                  </p>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xl text-primary-950 mb-2">
                {dashboardData && dashboardData?.topCategory.cost.toFixed(2)}$
              </p>
            </div>
            <div className="aspect-square w-[9999px] lg:max-w-lg max-w-[100%] flex-shrink flex items-center justify-center">
              <CostPerCategoryChart
                title={dateToMonthName(date)}
                costPerCategory={dashboardData?.costPerCategory}
              />
            </div>
          </>
        ) : (
          <p className="py-20 text-center">No data yet.</p>
        )}
      </div>
      <NavLink to="/Finance-Manager/analize">
        <CustomButton variant="primary" className="text-xl">
          Analize expenses
        </CustomButton>
      </NavLink>
    </div>
  );
}

export default MontlyExpenses;
