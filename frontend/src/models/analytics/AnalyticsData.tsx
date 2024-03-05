import { AnalyticsDataType } from "./AnalyticsDataType";
import { costPerCategory } from "./costs/CostPerCategory";
import { CostPerDate } from "./costs/CostPerDate";
import { CostPerMonth } from "./costs/CostPerMonth";

export interface AnalyticsData {
  dataType: AnalyticsDataType;
  startDate: Date;
  endDate: Date;
  totalCosts: number;
  totalPreviousCosts: number;
  comparedToPreviousCosts: string;
  costsPerCategory?: costPerCategory[];
  topCategory?: costPerCategory;
}
