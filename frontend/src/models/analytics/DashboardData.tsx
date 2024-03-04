import { ExpenseResponseData } from "../expenses/ExpenseResponseData";
import { costPerCategory } from "./CostPerCategory";

export interface DashboardData {
  monthlySpending: number;
  topCategory: {
    category: string;
    cost: number;
  };
  topExpense: ExpenseResponseData;
  costPerCategory: costPerCategory[];
}
