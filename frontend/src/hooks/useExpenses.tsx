import { useState, useEffect } from "react";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";
import { SortType } from "../models/SortType";
import { ExpenseHistoryType } from "../components/history/ExpensesHistory";
import { useExpensesContext } from "../context/ExpensesContext";
import { ExpenseData } from "../models/ExpenseData";
import { ExpenseType } from "../models/ExpenseType";
interface Props {
  page: number;
  itemsPerPage: number;
  sorting: SortType;
  type: ExpenseHistoryType;
  category: string;
  deletedExpense: ExpenseData | undefined;
}
export const useExpenses = ({
  page,
  itemsPerPage,
  sorting,
  type,
  category,
  deletedExpense,
}: Props) => {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const { GetExpenses } = useExpensesContext();
  useEffect(() => {
    const LoadExpenses = async () => {
      setIsPending(true);
      const data: AllExpensesResponseData = await GetExpenses(
        page,
        itemsPerPage,
        sorting,
        type === ExpenseHistoryType.PlannedExpenses
          ? ExpenseType.planned
          : ExpenseType.normal,
        category
      );
      setIsPending(false);
      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    };
    LoadExpenses();
  }, [
    GetExpenses,
    setExpenses,
    setTotalPages,
    setIsPending,
    deletedExpense,
    sorting,
    category,
    page,
    type,
    itemsPerPage,
  ]);
  return { expenses, totalPages, isPending };
};
