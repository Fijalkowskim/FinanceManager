import { AnalyticsData } from "./AnalyticsData";
import { CostPerDate } from "./costs/CostPerDate";

export interface DailyAnalyticsData extends AnalyticsData {
  costsPerDate: CostPerDate[];
  previousCostsPerDate: CostPerDate[];
}
