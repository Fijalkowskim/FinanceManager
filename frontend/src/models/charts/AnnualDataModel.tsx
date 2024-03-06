import { CostPerMonth } from "../analytics/costs/CostPerMonth";

export interface AnnualDataModel {
  costs: CostPerMonth[];
  label: string;
  barColor: string;
}
