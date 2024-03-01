import { ReactNode, createContext, useContext, useState } from "react";
import { ExpenseData } from "../models/ExpenseData";
import api from "../api/api";
import { ExpenseResponseData } from "../models/ExpenseResponseData";
import { DashboardData } from "../models/DashboardData";
import { SortType } from "../models/SortType";
import { AllExpensesResponseData } from "../models/AllExpensesResponseData";

interface ExpensesContextProviderProps {
  children: ReactNode;
}
interface ExpensesContextProps {
  GetMontlyDashbord: (date: Date) => Promise<DashboardData | undefined>;
  GetMontlyExpenses: (date: Date) => Promise<ExpenseData[]>;
  GetExpense: (id: number) => Promise<ExpenseData | undefined>;
  GetExpenses: (
    page: number,
    pageSize: number,
    sortType: SortType,
    category?: string
  ) => Promise<AllExpensesResponseData>;
  AddExpense: (cost: number, category: string, description: string) => void;
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
        const expenses: ExpenseData[] = [];
        (res.data.content as ExpenseResponseData[]).map((data) => {
          expenses.push({
            id: data.id,
            category: data.category,
            description: data.description,
            date: new Date(data.date),
            cost: data.cost,
          });
        });
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
  const AddExpense = (cost: number, category: string, description: string) => {
    const body = {
      cost: cost,
      category: category,
      description: description,
    };
    api
      .post("/expenses", body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const GetExpense = async (id: number): Promise<ExpenseData | undefined> => {
    try {
      const res = await api.get(`/expenses/${id}`);
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
    category?: string
  ): Promise<AllExpensesResponseData> => {
    try {
      const res = await api.get(
        `/expenses?page=${page}&pageSize=${pageSize}${
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
    <ExpensesContext.Provider
      value={{
        GetMontlyExpenses,
        GetMontlyDashbord,
        AddExpense,
        GetExpenses,
        GetExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
