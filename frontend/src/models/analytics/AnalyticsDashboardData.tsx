import { CostPerDate } from "./CostPerDate";
import { CostPerMonth } from "./CostPerMonth";

export interface AnalyticsDashboardData {
  dashboardType: string;
  startDate: Date;
  endDate: Date;
  costsPerDate: CostPerDate[];
  costsPerMonth: CostPerMonth[];
}
