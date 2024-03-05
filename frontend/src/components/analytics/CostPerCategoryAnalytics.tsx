import React from "react";
import { AnalyticsRangeData } from "../../models/analytics/AnalyticsRangeData";
import { AnalyticsDashboardData } from "../../models/analytics/AnalyticsDashboardData";
import AnalyticsComponentContainer from "./AnalyticsComponentContainer";
import CostPerCategoryChart from "../charts/CostPerCategoryChart";
import { GetCategoryData } from "../../data/Categories";

type Props = {
  analyticsDashboard: AnalyticsDashboardData;
};

function CostPerCategoryAnalytics({ analyticsDashboard }: Props) {
  return (
    <AnalyticsComponentContainer className=" justify-start p-2 gap-1">
      <h2 className="text-xl lg:text-2xl text-primary-700">
        Cost per category
      </h2>
      <CostPerCategoryChart
        costPerCategory={analyticsDashboard.costsPerCategory}
      />
      <h3 className="text-3xl text-primary-700">Top category:</h3>
      {analyticsDashboard.topCategory ? (
        <>
          <div className="flex items-center justify-center gap-1 text-2xl ">
            <p>
              {GetCategoryData(analyticsDashboard.topCategory.category).icon}
            </p>
            <p>{`${analyticsDashboard.topCategory.category}`}:</p>
            <p>{analyticsDashboard.topCategory.cost}$</p>
          </div>
          <p className="text-2xl"></p>
        </>
      ) : (
        "-"
      )}
    </AnalyticsComponentContainer>
  );
}

export default CostPerCategoryAnalytics;
