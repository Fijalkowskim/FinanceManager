import { CostPerDate } from "../analytics/costs/CostPerDate";

export interface DailyDataModel {
  startDate: Date;
  endDate: Date;
  data: { costs: CostPerDate[]; label: string; barColor: string }[];
}
