import React from "react";
import { AnalyticsRangeData } from "../../models/analytics/AnalyticsRangeData";
import TimePeriodExpensesChart from "../charts/TimePeriodExpensesChart";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import useTimePeriodExpenses from "../../hooks/useTimePeriodExpenses";

type Props = {
  range: AnalyticsRangeData;
  analyticsDashboard: AnalyticsData;
};

export default function TimePeriodExpenses({
  range,
  analyticsDashboard,
}: Props) {
  const { dailyData, annualData } = useTimePeriodExpenses(analyticsDashboard);
  return (
    <AnalyticsComponentContainer className="h-screen max-h-[30rem] pt-2">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Expenses in {range.filterText.toLocaleLowerCase()}
      </h2>
      <p className="text-xl">Total: {analyticsDashboard.totalCosts}$</p>
      <TimePeriodExpensesChart dailyData={dailyData} annualData={annualData} />
    </AnalyticsComponentContainer>
  );
}
