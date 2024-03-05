import React from "react";
import AnalyticsFilter from "./AnalyticsFilter";
import { useAnalyticsDashboard } from "../../hooks/useAnalyticsDashboard";
import TimePeriodExpensesChart from "../charts/TimePeriodExpensesChart";
import { useAnalyticsContext } from "../../context/AnalyticsContext";
import TimePeriodExpenses from "./TimePeriodExpenses";
import CostPerCategoryAnalytics from "./CostPerCategoryAnalytics";
import ComparisonAnalytics from "./ComparisonAnalytics";

function AnalyticsDashboard() {
  const { analyticsDashboard } = useAnalyticsDashboard();
  const { range } = useAnalyticsContext();
  return (
    <div className="flex items-center justify-start flex-col gap-6 lg:max-w-2xl w-full mx-auto overflow-hidden">
      <AnalyticsFilter />
      {analyticsDashboard !== undefined &&
      (analyticsDashboard.costsPerDate.length !== 0 ||
        analyticsDashboard.costsPerMonth.length !== 0) ? (
        <>
          <TimePeriodExpenses
            analyticsDashboard={analyticsDashboard}
            range={range}
          />
          {analyticsDashboard.costsPerCategory.length > 0 && (
            <CostPerCategoryAnalytics analyticsDashboard={analyticsDashboard} />
          )}
          <ComparisonAnalytics analyticsDashboard={analyticsDashboard} />
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
