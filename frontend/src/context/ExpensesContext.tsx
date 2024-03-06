import { ReactNode, createContext, useContext } from "react";
import { ExpenseData } from "../models/expenses/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/expenses/ExpenseResponseData";
import { DashboardData } from "../models/analytics/DashboardData";
import { SortType } from "../models/filtering/SortType";
import { AllExpensesResponseData } from "../models/expenses/AllExpensesResponseData";
import { ExpenseRequestData } from "../models/expenses/ExpenseRequestData";
import dateFormat from "dateformat";
import { ResponseStatusData } from "../models/api/ResponseStatusData";
import { ExpenseType } from "../models/expenses/ExpenseType";
import { PlannedExpensesData } from "../models/expenses/PlannedExpensesData";
import { DemoExpenses } from "../demo-data/DemoExpenses";
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
  const GetPaginationData = (
    expenses: ExpenseData[],
    page: number,
    pageSize: number
  ): { paginatedExpenses: ExpenseData[]; totalPages: number } => {
    const totalExpenses = expenses.length;
    const totalPages = Math.ceil(totalExpenses / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedExpenses = expenses.slice(startIndex, endIndex);
    return { paginatedExpenses: paginatedExpenses, totalPages: totalPages };
  };

  const GetMonthlyDashbord = async (
    date: Date
  ): Promise<DashboardData | undefined> => {
    try {
      const res = await api.get(
        `/expenses/dashboard?year=${date.getFullYear()}&month=${
          date.getMonth() + 1
        }`
      );
      if (res.data) {
        const dashboard: DashboardData = {
          monthlySpending: res.data.monthlySpending,
          topCategory: {
            category: res.data.categoriesAnalytics.topCategory.category,
            cost: res.data.categoriesAnalytics.topCategory.cost,
          },
          topExpense: res.data.topExpense,
          costPerCategory: res.data.categoriesAnalytics.costsPerCategory.map(
            (cost: any) => ({
              category: cost.category,
              cost: cost.cost,
            })
          ),
        };
        return dashboard;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const AddExpense = async (
    expense: ExpenseRequestData,
    type: ExpenseType
  ): Promise<ResponseStatusData> => {
    const body = {
      cost: expense.cost,
      category: expense.category,
      description: expense.description,
      date: dateFormat(expense.date, "yyyy-mm-dd hh:MM:ss"),
    };
    try {
      const res = await api.post(
        `/${type === ExpenseType.planned ? "planned_expenses" : "expenses"}`,
        body
      );
      return {
        status: res.status,
        message: "Expense added",
      } as ResponseStatusData;
    } catch (err) {
      console.log(err);
    }
    return {
      status: 500,
      message: "Something went wrong",
    } as ResponseStatusData;
  };
  const GetExpense = async (
    id: number,
    type: ExpenseType
  ): Promise<ExpenseData | undefined> => {
    return type === ExpenseType.normal
      ? DemoExpenses.find((exp) => exp.id === id)
      : DemoPlannedExpenses.find((exp) => exp.id === id);
  };
  const GetExpenses = async (
    page: number,
    pageSize: number,
    sortType: SortType,
    type: ExpenseType,
    category?: string
  ): Promise<AllExpensesResponseData> => {
    let data = type === ExpenseType.normal ? DemoExpenses : DemoPlannedExpenses;
    let expenses: ExpenseData[] = data;

    if (category) {
      expenses = data.filter((d) => d.category === category);
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
    const body = {
      cost: expense.cost,
      category: expense.category,
      description: expense.description,
      date: dateFormat(expense.date, "yyyy-mm-dd hh:MM:ss"),
    };
    try {
      const res = await api.put(
        `/${
          type === ExpenseType.planned ? "planned_expenses" : "expenses"
        }/${id}`,
        body
      );
      return {
        status: res.status,
        message: "Expense updated",
      } as ResponseStatusData;
    } catch (err) {
      console.log(err);
    }
    return {
      status: 500,
      message: "Something went wrong",
    } as ResponseStatusData;
  };
  const GetPlannedExpensesDashboard = async (
    daysFromNow: number,
    amount: number
  ): Promise<PlannedExpensesData> => {
    try {
      const res = await api.get(
        `/planned_expenses/dashboard?daysFromNow=${daysFromNow}&amount=${amount}`
      );
      if (res.data) {
        const expenses: ExpenseData[] = (
          res.data.plannedExpenses as ExpenseResponseData[]
        ).map((data) => {
          return {
            id: data.id,
            category: data.category,
            description: data.description,
            date: new Date(data.date),
            cost: data.cost,
          };
        });
        return {
          plannedExpenses: expenses,
          totalPlannedExpenses: res.data.totalPlannedExpenses,
        };
      }
    } catch (err) {
      console.log(err);
    }
    return { plannedExpenses: [], totalPlannedExpenses: 0 };
  };
  const DeleteExpense = async (
    id: number,
    type: ExpenseType
  ): Promise<ResponseStatusData> => {
    try {
      const res = await api.delete(
        `/${
          type === ExpenseType.planned ? "planned_expenses" : "expenses"
        }/${id}`
      );
      return {
        status: res.status,
        message: "Expense deleted",
      } as ResponseStatusData;
    } catch (err) {
      console.log(err);
    }
    return {
      status: 500,
      message: "Cannot delete expense",
    } as ResponseStatusData;
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
  return (
    <ExpensesContext.Provider
      value={{
        GetMonthlyDashbord,
        AddExpense,
        GetExpenses,
        GetExpense,
        UpdateExpense,
        GetPlannedExpensesDashboard,
        DeleteExpense,
        PayPlannedExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
