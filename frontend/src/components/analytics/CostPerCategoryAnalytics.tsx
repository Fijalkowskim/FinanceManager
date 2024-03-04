import React from "react";
import { AnalyticsRangeData } from "../../models/analytics/AnalyticsRangeData";
import { AnalyticsDashboardData } from "../../models/analytics/AnalyticsDashboardData";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import CostPerCategoryChart from "../charts/CostPerCategoryChart";

type Props = {
  analyticsDashboard: AnalyticsDashboardData;
};

function CostPerCategoryAnalytics({ analyticsDashboard }: Props) {
  return (
    <AnalyticsComponentContainer className=" justify-start p-2">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Cost per category
      </h2>
      <CostPerCategoryChart
        costPerCategory={analyticsDashboard.costsPerCategory}
      />
    </AnalyticsComponentContainer>
  );
}

export default CostPerCategoryAnalytics;
