import React from "react";
import { AnalyticsRangeData } from "../../models/analytics/AnalyticsRangeData";
import TimePeriodExpensesChart from "../charts/TimePeriodExpensesChart";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";

type Props = {
  range: AnalyticsRangeData;
  analyticsDashboard: AnalyticsData;
};

export default function TimePeriodExpenses({
  range,
  analyticsDashboard,
}: Props) {
  return (
    <AnalyticsComponentContainer className="h-screen max-h-[30rem] ">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Expenses in {range.filterText.toLocaleLowerCase()}
      </h2>
      <TimePeriodExpensesChart analyticsDashboardData={analyticsDashboard} />
    </AnalyticsComponentContainer>
  );
}
