import { ReactNode, createContext, useContext, useState } from "react";
import { ExpenseData } from "../models/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/ExpenseResponseData";
import { DashboardData } from "../models/DashboardData";
import { SortType } from "../models/SortType";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";
import dateFormat from "dateformat";
import { PlannedExpensesData } from "../models/PlannedExpensesData";
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
    cost: number,
    category: string,
    description: string,
    date: Date
  ) => void;
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
  const AddPlannedExpense = (
    cost: number,
    category: string,
    description: string,
    date: Date
  ) => {
    const body = {
      cost: cost,
      category: category,
      description: description,
      date: dateFormat(date, "yyyy-mm-dd hh:MM:ss"),
    };
    api
      .post("/planned_expenses", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
  return (
    <PlannedExpensesContext.Provider
      value={{
        GetPlannedExpense,
        AddPlannedExpense,
        GetPlannedExpenses,
        GetPlannedExpensesDashboard,
      }}
    >
      {children}
    </PlannedExpensesContext.Provider>
  );
}
