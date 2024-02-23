import { ExpenseResponseData } from "./ExpenseResponseData";

export interface DashboardData {
  monthlySpending: number;
  topCategory: {
    category: string;
    spening: number;
  };
  topExpense: ExpenseResponseData;
  costPerCategory: [
    {
      category: string;
      spending: number;
    }
  ];
}
