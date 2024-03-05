import React from "react";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import { useAnalyticsContext } from "../../context/AnalyticsContext";

type Props = {
  analyticsDashboard: AnalyticsData;
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
