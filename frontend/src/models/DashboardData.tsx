import { ExpenseResponseData } from "./ExpenseResponseData";

export interface DashboardData {
  monthlySpending: number;
  topCategory: {
    category: string;
    cost: number;
  };
  topExpense: ExpenseResponseData;
  costPerCategory: [
    {
      category: string;
      cost: number;
    }
  ];
}
