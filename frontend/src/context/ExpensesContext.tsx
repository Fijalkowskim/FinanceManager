import { ReactNode, createContext, useContext } from "react";
import { ExpenseData } from "../models/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/ExpenseResponseData";
import { DashboardData } from "../models/DashboardData";
import { SortType } from "../models/SortType";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";
import { ExpenseRequestData } from "../models/ExpenseRequestData";
import dateFormat from "dateformat";
import { ResponseStatusData } from "../models/ResponseStatusData";
import { ExpenseType } from "../models/ExpenseType";
import { PlannedExpensesData } from "../models/PlannedExpensesData";
interface ExpensesContextProviderProps {
  children: ReactNode;
}
interface ExpensesContextProps {
  GetMontlyDashbord: (date: Date) => Promise<DashboardData | undefined>;
  GetPlannedExpensesDashboard: (
    daysFromNow: number,
    amount: number
  ) => Promise<PlannedExpensesData>;
  GetMontlyExpenses: (date: Date) => Promise<ExpenseData[]>;
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
}
const ExpensesContext = createContext({} as ExpensesContextProps);

export function useExpensesContext() {
  return useContext(ExpensesContext);
}

export function ExpensesContextProvider({
  children,
}: ExpensesContextProviderProps) {
  const GetMontlyExpenses = async (date: Date): Promise<ExpenseData[]> => {
    try {
      const res = await api.get(
        `/expenses/monthly?year=${date.getFullYear()}&month=${
          date.getMonth() + 1
        }&pageSize=31`
      );
      if (res.data.content) {
        const expenses: ExpenseData[] = (
          res.data.content as ExpenseResponseData[]
        ).map((data) => ({
          id: data.id,
          category: data.category,
          description: data.description,
          date: new Date(data.date),
          cost: data.cost,
        }));
        return expenses;
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };
  const GetMontlyDashbord = async (
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
            category: res.data.topCategory.category,
            cost: res.data.topCategory.cost,
          },
          topExpense: res.data.topExpense,
          costPerCategory: res.data.costsPerCategory.map((cost: any) => ({
            category: cost.category,
            cost: cost.cost,
          })),
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
    try {
      const res = await api.get(
        `/${
          type === ExpenseType.planned ? "planned_expenses" : "expenses"
        }/${id}`
      );
      if (res.data) {
        const expense: ExpenseData = {
          id: res.data.id,
          category: res.data.category,
          description: res.data.description,
          date: new Date(res.data.date),
          cost: res.data.cost,
        };
        return expense;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const GetExpenses = async (
    page: number,
    pageSize: number,
    sortType: SortType,
    type: ExpenseType,
    category?: string
  ): Promise<AllExpensesResponseData> => {
    try {
      if (category === "All") category = undefined;
      const res = await api.get(
        `/${
          type === ExpenseType.planned ? "planned_expenses" : "expenses"
        }?page=${page}&pageSize=${pageSize}${
          category ? `&category=${category}` : ""
        }${
          sortType === SortType.DateAsc
            ? "&sortDate=asc"
            : sortType === SortType.DateDesc
            ? "&sortDate=desc"
            : sortType === SortType.CostAsc
            ? "&sortCost=asc"
            : "&sortCost=desc"
        }`
      );
      if (res.data.content) {
        const expenses: ExpenseData[] = (
          res.data.content as ExpenseResponseData[]
        ).map((data) => {
          return {
            id: data.id,
            category: data.category,
            description: data.description,
            date: new Date(data.date),
            cost: data.cost,
          };
        });
        return { expenses: expenses, totalPages: res.data.totalPages };
      }
    } catch (err) {
      console.log(err);
    }
    return { expenses: [], totalPages: 0 };
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
  return (
    <ExpensesContext.Provider
      value={{
        GetMontlyExpenses,
        GetMontlyDashbord,
        AddExpense,
        GetExpenses,
        GetExpense,
        UpdateExpense,
        GetPlannedExpensesDashboard,
        DeleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
