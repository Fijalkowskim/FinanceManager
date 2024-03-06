import React from "react";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import { useAnalyticsContext } from "../../context/AnalyticsContext";
import TimePeriodExpensesChart from "../charts/TimePeriodExpensesChart";
import useTimeComparedExpenses from "../../hooks/useComparedExpenses";

type Props = {
  analyticsDashboard: AnalyticsData;
};

export default function ComparisonAnalytics({ analyticsDashboard }: Props) {
  const { range } = useAnalyticsContext();
  const { dailyData, annualData } = useTimeComparedExpenses(analyticsDashboard);
  return (
    <AnalyticsComponentContainer className=" justify-start p-2 gap-1">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Compared to {range.comparedToPreviousText.toLocaleLowerCase()}
      </h2>
      <p className="text-xl">
        {analyticsDashboard.comparedToPreviousCosts} costs
      </p>
      <TimePeriodExpensesChart
        dailyData={dailyData}
        annualData={annualData}
        legendVisible
      />
    </AnalyticsComponentContainer>
  );
}
