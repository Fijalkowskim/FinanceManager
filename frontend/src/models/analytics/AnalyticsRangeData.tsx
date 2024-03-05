import { AnalyticsDataType } from "./AnalyticsDataType";

export interface AnalyticsRangeData {
  filterText: string;
  apiParam: string;
  dataType: AnalyticsDataType;
  comparedToPreviousText: string;
  daysBack?: number;
}
