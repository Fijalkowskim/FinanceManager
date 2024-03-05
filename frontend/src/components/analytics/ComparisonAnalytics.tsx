import React from "react";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import { useAnalyticsContext } from "../../context/AnalyticsContext";
import ComparisonChart from "../charts/ComparisonChart";

type Props = {
  analyticsDashboard: AnalyticsData;
};

export default function ComparisonAnalytics({ analyticsDashboard }: Props) {
  const { range } = useAnalyticsContext();
  return (
    <AnalyticsComponentContainer className=" justify-start p-2 gap-1">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Compared to {range.comparedToPreviousText.toLocaleLowerCase()}
      </h2>
      <p className="text-xl">
        {analyticsDashboard.comparedToPreviousCosts} costs
      </p>
      <ComparisonChart analyticsDashboardData={analyticsDashboard} />
    </AnalyticsComponentContainer>
  );
}
