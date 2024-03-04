import React from "react";
import AnalyticsFilter from "./AnalyticsFilter";
import { useAnalyticsDashboard } from "../../hooks/useAnalyticsDashboard";
import TimePeriodExpensesChart from "./TimePeriodExpensesChart";

function AnalyticsDashboard() {
  const { analyticsDashboard } = useAnalyticsDashboard();
  return (
    <div className="flex items-center justify-start flex-col gap-1 w-full overflow-hidden">
      <AnalyticsFilter />
      {analyticsDashboard !== undefined &&
      (analyticsDashboard.costsPerDate.length !== 0 ||
        analyticsDashboard.costsPerMonth.length !== 0) ? (
        <>
          <TimePeriodExpensesChart
            analyticsDashboardData={analyticsDashboard}
          />
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
