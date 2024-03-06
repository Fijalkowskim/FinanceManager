import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ExpenseData } from "../models/expenses/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/expenses/ExpenseResponseData";
import { DashboardData } from "../models/analytics/DashboardData";
import { SortType } from "../models/filtering/SortType";
import { AllExpensesResponseData } from "../models/expenses/AllExpensesResponseData";
import { ExpenseRequestData } from "../models/expenses/ExpenseRequestData";
import { ResponseStatusData } from "../models/api/ResponseStatusData";
import { ExpenseType } from "../models/expenses/ExpenseType";
import { PlannedExpensesData } from "../models/expenses/PlannedExpensesData";
import { DemoExpenses, GetNewExpenseId } from "../demo-data/DemoExpenses";
import { DemoPlannedExpenses } from "../demo-data/DemoPlannedExpenses";
interface ExpensesContextProviderProps {
  children: ReactNode;
}
interface ExpensesContextProps {
  GetMonthlyDashbord: (date: Date) => Promise<DashboardData | undefined>;
  GetPlannedExpensesDashboard: (
    daysFromNow: number,
    amount: number
  ) => Promise<PlannedExpensesData>;
  GetExpense: (
    id: number,
    type: ExpenseType
  ) => Promise<ExpenseData | undefined>;
  GetExpenses: (
    page: number,
    pageSize: number,
    sortType: SortType,
    type: ExpenseType,
    category?: string
  ) => Promise<AllExpensesResponseData>;
  AddExpense: (
    expense: ExpenseRequestData,
    type: ExpenseType
  ) => Promise<ResponseStatusData>;
  UpdateExpense: (
    id: number,
    expense: ExpenseRequestData,
    type: ExpenseType
  ) => Promise<ResponseStatusData>;
  DeleteExpense: (id: number, type: ExpenseType) => Promise<ResponseStatusData>;
  PayPlannedExpense: (id: number) => Promise<ResponseStatusData>;
}
const ExpensesContext = createContext({} as ExpensesContextProps);

export function useExpensesContext() {
  return useContext(ExpensesContext);
}

export function ExpensesContextProvider({
  children,
}: ExpensesContextProviderProps) {
  const [savedExpenses, setSavedExpenses] =
    useState<ExpenseData[]>(DemoExpenses);
  const [savedPlannedExpenses, setSavedPlannedExpenses] =
    useState<ExpenseData[]>(DemoPlannedExpenses);

  const GetPaginationData = (
    expenses: ExpenseData[],
    page: number,
    pageSize: number
  ): { paginatedExpenses: ExpenseData[]; totalPages: number } => {
    if (pageSize === 0) return { paginatedExpenses: [], totalPages: 0 };
    const totalExpenses = expenses.length;
    const totalPages = Math.ceil(totalExpenses / pageSize);
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedExpenses = expenses.slice(startIndex, endIndex);

    return { paginatedExpenses: paginatedExpenses, totalPages: totalPages };
  };
  function padZero(value: number) {
    return value < 10 ? `0${value}` : value;
  }
  function formatDateForSQL(date: Date) {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const GetMonthlyDashbord = async (
    date: Date
  ): Promise<DashboardData | undefined> => {
    const data = savedExpenses;

    const filteredData = data.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === date.getFullYear() &&
        expenseDate.getMonth() === date.getMonth()
      );
    });

    const monthlySpending = filteredData.reduce(
      (total, expense) => total + expense.cost,
      0
    );

    const sortedByCategory: { [key: string]: number } = filteredData.reduce(
      (acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = 0;
        }
        acc[expense.category] += expense.cost;
        return acc;
      },
      {} as { [key: string]: number }
    );
    const topCategory = Object.entries(sortedByCategory).reduce(
      (max, [category, cost]) => (cost > max.cost ? { category, cost } : max),
      { category: "", cost: 0 }
    );
    const topExpenseData = filteredData.reduce(
      (max, expense) => (expense.cost > max.cost ? expense : max),
      {
        id: 0,
        cost: 0,
        category: "",
        description: "",
        date: new Date(),
      }
    );
    const topExpense: ExpenseResponseData = {
      id: topExpenseData.id,
      cost: topExpenseData.cost,
      description: topExpenseData.description,
      category: topExpenseData.category,
      date: formatDateForSQL(topExpenseData.date),
    };

    const costPerCategory = Object.entries(sortedByCategory).map(
      ([category, cost]) => ({ category, cost })
    );
    const retVal: DashboardData = {
      monthlySpending,
      topCategory,
      topExpense,
      costPerCategory,
    };
    return retVal;
  };
  const AddExpense = async (
    expense: ExpenseRequestData,
    type: ExpenseType
  ): Promise<ResponseStatusData> => {
    const newExpense: ExpenseData = {
      id: GetNewExpenseId(),
      ...expense,
    };
    if (type === ExpenseType.normal) {
      setSavedExpenses((prev) => [...prev, newExpense]);
      return { status: 200, message: "Expense added" };
    }
    setSavedPlannedExpenses((prev) => [...prev, newExpense]);
    return { status: 200, message: "Expense added" };
  };
  const GetExpense = async (
    id: number,
    type: ExpenseType
  ): Promise<ExpenseData | undefined> => {
    return type === ExpenseType.normal
      ? savedExpenses.find((exp) => exp.id === id)
      : savedPlannedExpenses.find((exp) => exp.id === id);
  };
  const GetExpenses = async (
    page: number,
    pageSize: number,
    sortType: SortType,
    type: ExpenseType,
    category?: string
  ): Promise<AllExpensesResponseData> => {
    let data =
      type === ExpenseType.normal ? savedExpenses : savedPlannedExpenses;
    let expenses: ExpenseData[] = [...data];

    if (category !== undefined && category !== "All" && category !== "") {
      expenses = expenses.filter((e) => e.category === category);
    }

    switch (sortType) {
      case SortType.CostAsc:
        expenses.sort((a, b) => a.cost - b.cost);
        break;
      case SortType.CostDesc:
        expenses.sort((a, b) => b.cost - a.cost);
        break;
      case SortType.DateAsc:
        expenses.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case SortType.DateDesc:
        expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
    }

    const { paginatedExpenses, totalPages } = GetPaginationData(
      expenses,
      page,
      pageSize
    );
    return { expenses: paginatedExpenses, totalPages };
  };
  const UpdateExpense = async (
    id: number,
    expense: ExpenseRequestData,
    type: ExpenseType
  ): Promise<ResponseStatusData> => {
    const newExpense: ExpenseData = {
      id: id,
      ...expense,
    };

    if (type === ExpenseType.normal) {
      setSavedExpenses((prev) =>
        prev.map((e) => (e.id === id ? newExpense : e))
      );
      return { status: 200, message: "Expense updated" };
    }

    setSavedPlannedExpenses((prev) =>
      prev.map((e) => (e.id === id ? newExpense : e))
    );
    return { status: 200, message: "Expense updated" };
  };
  const GetPlannedExpensesDashboard = async (
    daysFromNow: number,
    amount: number
  ): Promise<PlannedExpensesData> => {
    const currentDate = new Date();

    const plannedExpensesData = savedPlannedExpenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        const daysDifference = Math.floor(
          (expenseDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
        );

        return (
          daysDifference >= -daysFromNow &&
          daysDifference <= daysFromNow &&
          expense.cost <= amount
        );
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      plannedExpenses: plannedExpensesData,
      totalPlannedExpenses: plannedExpensesData.length,
    };
  };
  const DeleteExpense = async (
    id: number,
    type: ExpenseType
  ): Promise<ResponseStatusData> => {
    if (type === ExpenseType.normal) {
      setSavedExpenses((prev) => prev.filter((e) => e.id !== id));
      return { status: 200, message: "Expense deleted" };
    }

    setSavedPlannedExpenses((prev) => prev.filter((e) => e.id !== id));
    return { status: 200, message: "Expense deleted" };
  };
  const PayPlannedExpense = async (id: number): Promise<ResponseStatusData> => {
    try {
      const res = await api.delete(`/planned_expenses/pay/${id}`);
      return {
        status: res.status,
        message: "Expense paid",
      } as ResponseStatusData;
    } catch (err) {
      console.log(err);
    }
    return {
      status: 500,
      message: "Cannot pay expense",
    } as ResponseStatusData;
  };
  const contextValue = useMemo(
    () => ({
      GetMonthlyDashbord,
      AddExpense,
      GetExpenses,
      GetExpense,
      UpdateExpense,
      GetPlannedExpensesDashboard,
      DeleteExpense,
      PayPlannedExpense,
    }),
    [
      GetMonthlyDashbord,
      AddExpense,
      GetExpenses,
      GetExpense,
      UpdateExpense,
      GetPlannedExpensesDashboard,
      DeleteExpense,
      PayPlannedExpense,
    ]
  );
  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
}
