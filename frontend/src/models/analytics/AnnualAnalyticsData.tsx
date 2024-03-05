import { AnalyticsData } from "./AnalyticsData";
import { CostPerMonth } from "./costs/CostPerMonth";

export interface AnnualAnalyticsData extends AnalyticsData {
  costsPerMonth: CostPerMonth[];
  previousCostsPerMonth: CostPerMonth[];
}
