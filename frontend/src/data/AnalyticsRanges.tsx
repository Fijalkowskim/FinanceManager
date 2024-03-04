import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";

export const last7days: AnalyticsRangeData = {
  filterText: "Last 7 days",
  apiParam: "days=7",
};

export const last30days: AnalyticsRangeData = {
  filterText: "Last 30 days",
  apiParam: "days=30",
};

export const last90days: AnalyticsRangeData = {
  filterText: "Last 90 days",
  apiParam: "days=90",
};

export const lastYear: AnalyticsRangeData = {
  filterText: "Last year",
  apiParam: "year=1",
};
export const analyticsRanges: AnalyticsRangeData[] = [
  last7days,
  last30days,
  last90days,
  lastYear,
];
