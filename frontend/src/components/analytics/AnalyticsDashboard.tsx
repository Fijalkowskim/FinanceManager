import React from "react";
import AnalyticsFilter from "./AnalyticsFilter";
import { useAnalyticsDashboard } from "../../hooks/useAnalyticsDashboard";
import TimePeriodExpensesChart from "./TimePeriodExpensesChart";
import { useAnalyticsContext } from "../../context/AnalyticsContext";

function AnalyticsDashboard() {
  const { analyticsDashboard } = useAnalyticsDashboard();
  const { range } = useAnalyticsContext();
  return (
    <div className="flex items-center justify-start flex-col gap-6 w-full overflow-hidden">
      <AnalyticsFilter />
      {analyticsDashboard !== undefined &&
      (analyticsDashboard.costsPerDate.length !== 0 ||
        analyticsDashboard.costsPerMonth.length !== 0) ? (
        <>
          <div className=" lg:max-w-2xl w-full flex flex-col items-center justify-center bg-background-50 rounded-md shadow-md p-5 text-center h-screen max-h-[30rem] ">
            <h2 className="text-xl lg:text-2xl text-primary-700">
              Expenses in {range.filterText.toLocaleLowerCase()}
            </h2>
            <TimePeriodExpensesChart
              analyticsDashboardData={analyticsDashboard}
            />
          </div>
        </>
      ) : (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-xl">No expenses in selected time period</p>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
