import React from "react";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import { AnalyticsDashboardData } from "../../models/analytics/AnalyticsDashboardData";
import { useAnalyticsContext } from "../../context/AnalyticsContext";

type Props = {
  analyticsDashboard: AnalyticsDashboardData;
};

export default function ComparisonAnalytics({ analyticsDashboard }: Props) {
  const { range } = useAnalyticsContext();
  return (
    <AnalyticsComponentContainer className=" justify-start p-2 gap-1">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Compared to {range.comparedToPreviousText}
      </h2>
    </AnalyticsComponentContainer>
  );
}