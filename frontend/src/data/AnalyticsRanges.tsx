import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";

export const last7days: AnalyticsRangeData = {
  filterText: "Last 7 days",
  apiParam: "days/7",
  daysBack: 7,
  dataType: AnalyticsDataType.daily,
  comparedToPreviousText: "Previous 7 days",
};

export const last30days: AnalyticsRangeData = {
  filterText: "Last 30 days",
  apiParam: "days/30",
  daysBack: 30,
  dataType: AnalyticsDataType.daily,
  comparedToPreviousText: "Previous 30 days",
};

export const last90days: AnalyticsRangeData = {
  filterText: "Last 90 days",
  apiParam: "days/90",
  daysBack: 90,
  dataType: AnalyticsDataType.daily,
  comparedToPreviousText: "Previous 90 days",
};

export const analyticsRanges: AnalyticsRangeData[] = [
  last7days,
  last30days,
  last90days,
];
