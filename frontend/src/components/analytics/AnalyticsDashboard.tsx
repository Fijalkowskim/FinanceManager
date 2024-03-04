import React from "react";
import AnalyticsFilter from "./AnalyticsFilter";

function AnalyticsDashboard() {
  return (
    <div className="flex items-center justify-start flex-col gap-1 w-full overflow-hidden">
      <AnalyticsFilter />
    </div>
  );
}

export default AnalyticsDashboard;
