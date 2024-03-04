import { ReactNode, createContext, useContext, useState } from "react";
import { ExpenseData } from "../models/expenses/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/expenses/ExpenseResponseData";
import { DashboardData } from "../models/analytics/DashboardData";
import { SortType } from "../models/filtering/SortType";
import { AllExpensesResponseData } from "../models/expenses/AllExpensesResponseData";
import dateFormat from "dateformat";
import { PlannedExpensesData } from "../models/expenses/PlannedExpensesData";
import { ExpenseRequestData } from "../models/expenses/ExpenseRequestData";
import { ResponseStatusData } from "../models/api/ResponseStatusData";
interface PlannedExpensesContextProviderProps {
  children: ReactNode;
}
interface PlannedExpensesContextProps {
  GetPlannedExpense: (id: number) => Promise<ExpenseData | undefined>;
  GetPlannedExpenses: (
    page: number,
    pageSize: number,
    sortType: SortType,
    category?: string
  ) => Promise<AllExpensesResponseData>;
  GetPlannedExpensesDashboard: (
    daysFromNow: number,
    amount: number
  ) => Promise<PlannedExpensesData>;
  AddPlannedExpense: (
    expense: ExpenseRequestData
  ) => Promise<ResponseStatusData>;
  UpdatePlannedExpense: (
    id: number,
    expense: ExpenseRequestData
  ) => Promise<ResponseStatusData>;
}
const PlannedExpensesContext = createContext({} as PlannedExpensesContextProps);

export function usePlannedExpensesContext() {
  return useContext(PlannedExpensesContext);
}
export function PlannedExpensesContextProvider({
  children,
}: PlannedExpensesContextProviderProps) {
  const GetPlannedExpense = async (
    id: number
  ): Promise<ExpenseData | undefined> => {
    try {
      const res = await api.get(`/planned_expenses/${id}`);
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
  const AddPlannedExpense = async (
    expense: ExpenseRequestData
  ): Promise<ResponseStatusData> => {
    const body = {
      cost: expense.cost,
      category: expense.category,
      description: expense.description,
      date: dateFormat(expense.date, "yyyy-mm-dd hh:MM:ss"),
    };
    try {
      const res = await api.post("/planned_expenses", body);
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
  const GetPlannedExpenses = async (
    page: number,
    pageSize: number,
    sortType: SortType,
    category?: string
  ): Promise<AllExpensesResponseData> => {
    try {
      const res = await api.get(
        `/planned_expenses?page=${page}&pageSize=${pageSize}${
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
  const UpdatePlannedExpense = async (
    id: number,
    expense: ExpenseRequestData
  ): Promise<ResponseStatusData> => {
    const body = {
      cost: expense.cost,
      category: expense.category,
      description: expense.description,
      date: dateFormat(expense.date, "yyyy-mm-dd hh:MM:ss"),
    };
    try {
      const res = await api.put(`/planned_expenses/${id}`, body);
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
  return (
    <PlannedExpensesContext.Provider
      value={{
        GetPlannedExpense,
        AddPlannedExpense,
        GetPlannedExpenses,
        GetPlannedExpensesDashboard,
        UpdatePlannedExpense,
      }}
    >
      {children}
    </PlannedExpensesContext.Provider>
  );
}
