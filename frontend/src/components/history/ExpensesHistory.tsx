import React, { useEffect, useState } from "react";
import { categories } from "../../categories/Categories";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { SortType } from "../../models/SortType";
import { useExpensesContext } from "../../context/ExpensesContext";
import { ExpenseData } from "../../models/ExpenseData";
import ExpenseCard from "./ExpenseCard";

import { AllExpensesResponseData } from "../../models/AllExpensesResponseData";
import PageNavigation from "./PageNavigation";
import HistoryFilters from "./HistoryFilters";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import { ExpenseType } from "../../models/ExpenseType";

export enum ExpenseHistoryType {
  Expenses,
  PlannedExpenses,
}
interface Props {
  type?: ExpenseHistoryType;
}

function ExpensesHistory({ type }: Props) {
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState<SortType>(SortType.DateDesc);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData>();

  const { GetExpenses } = useExpensesContext();

  const LoadExpenses = async () => {
    const data: AllExpensesResponseData =
      category === "All"
        ? await GetExpenses(
            page,
            itemsPerPage,
            sorting,
            type === ExpenseHistoryType.PlannedExpenses
              ? ExpenseType.planned
              : ExpenseType.normal
          )
        : await GetExpenses(
            page,
            itemsPerPage,
            sorting,
            type === ExpenseHistoryType.PlannedExpenses
              ? ExpenseType.planned
              : ExpenseType.normal,
            category
          );
    setExpenses(data.expenses);
    setTotalPages(data.totalPages);
  };
  useEffect(() => {
    LoadExpenses();
  }, [GetExpenses, setExpenses, setTotalPages, sorting, category, page, type]);
  return (
    <div className="flex items-center justify-start flex-col gap-1 w-full overflow-hidden">
      {type === ExpenseHistoryType.PlannedExpenses && (
        <NavLink to="/Finance-Manager/plan">
          <CustomButton variant={"primary"}>Add planned expense</CustomButton>
        </NavLink>
      )}
      <HistoryFilters
        category={category}
        setCategory={setCategory}
        sorting={sorting}
        setSorting={setSorting}
      />
      <div className="-mt-3" />
      {expenses.length > 0 && (
        <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />
      )}
      <div className="-mb-3" />
      <motion.div
        layout
        className="flex flex-col justify-start items-center w-full gap-3 mt-4 "
      >
        <AnimatePresence mode="popLayout">
          {expenses.map((expense, idx) => (
            <ExpenseCard
              expense={expense}
              key={idx}
              planned={type === ExpenseHistoryType.PlannedExpenses}
              details={selectedExpense === expense}
              onClick={() => {
                setSelectedExpense((prev) =>
                  prev === expense ? undefined : expense
                );
              }}
              onDelete={LoadExpenses}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {expenses.length === 0 && <p>No expesnses yet</p>}
      {expenses.length > 0 && (
        <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </div>
  );
}

export default ExpensesHistory;
