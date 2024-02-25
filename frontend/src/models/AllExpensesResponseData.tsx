import { ExpenseData } from "./ExpenseData";

export interface AllExpensesResponseData {
  expenses: ExpenseData[];
  totalPages: number;
}
