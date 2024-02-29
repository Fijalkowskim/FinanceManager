import { ReactNode, createContext, useContext, useState } from "react";
import { ExpenseData } from "../models/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/ExpenseResponseData";
import { DashboardData } from "../models/DashboardData";
import { SortType } from "../models/SortType";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";
import dateFormat from "dateformat";
interface PlannedExpensesContextProviderProps {
  children: ReactNode;
}
interface PlannedExpensesContextProps {
  GetPlannedExpenses: (
    page: number,
    pageSize: number,
    sortType: SortType,
    category?: string
  ) => Promise<AllExpensesResponseData>;
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
  return (
    <PlannedExpensesContext.Provider
      value={{ AddPlannedExpense, GetPlannedExpenses }}
    >
      {children}
    </PlannedExpensesContext.Provider>
  );
}
