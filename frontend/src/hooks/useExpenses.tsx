import { useState, useEffect } from "react";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";
import { ExpenseHistoryType } from "../components/history/ExpensesHistory";
import { useExpensesContext } from "../context/ExpensesContext";
import { ExpenseData } from "../models/ExpenseData";
import { ExpenseType } from "../models/ExpenseType";
import { useExpenseHistoryContext } from "../context/ExpenseHistoryContext";

export const useExpenses = (historyType: ExpenseHistoryType) => {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const { page, itemsPerPage, sorting, category, deletedExpense } =
    useExpenseHistoryContext();
  const { GetExpenses } = useExpensesContext();
  useEffect(() => {
    const LoadExpenses = async () => {
      setIsPending(true);
      const data: AllExpensesResponseData = await GetExpenses(
        page,
        itemsPerPage,
        sorting,
        historyType === ExpenseHistoryType.PlannedExpenses
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
    historyType,
    itemsPerPage,
  ]);
  return { expenses, totalPages, isPending };
};
