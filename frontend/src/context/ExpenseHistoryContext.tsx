import { ReactNode, createContext, useContext, useState } from "react";
import { SortType } from "../models/filtering/SortType";
import { ExpenseData } from "../models/expenses/ExpenseData";

const ExpenseHistoryContext = createContext({} as ExpenseHistoryContextProps);

export function useExpenseHistoryContext() {
  return useContext(ExpenseHistoryContext);
}

interface ExpenseHistoryContextProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sorting: SortType;
  setSorting: React.Dispatch<React.SetStateAction<SortType>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  itemsPerPage: number;
  selectedExpense: ExpenseData | undefined;
  setSelectedExpense: React.Dispatch<
    React.SetStateAction<ExpenseData | undefined>
  >;
  deletedExpense: ExpenseData | undefined;
  setDeletedExpense: React.Dispatch<
    React.SetStateAction<ExpenseData | undefined>
  >;
}
export function ExpenseHistoryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState<SortType>(SortType.DateDesc);
  const [page, setPage] = useState(0);
  const [totalPages] = useState(0);
  const [itemsPerPage] = useState(20);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData>();
  const [deletedExpense, setDeletedExpense] = useState<ExpenseData>();

  const contextProps: ExpenseHistoryContextProps = {
    category,
    setCategory,
    sorting,
    setSorting,
    page,
    setPage,
    totalPages,
    itemsPerPage,
    selectedExpense,
    setSelectedExpense,
    deletedExpense,
    setDeletedExpense,
  };
  return (
    <ExpenseHistoryContext.Provider value={contextProps}>
      {children}
    </ExpenseHistoryContext.Provider>
  );
}
