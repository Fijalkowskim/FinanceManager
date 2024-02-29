import React, { useEffect, useState } from "react";
import { categories } from "../../categories/Categories";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { SortType } from "../../models/SortType";
import { useExpensesContext } from "../../context/ExpensesContext";
import { ExpenseData } from "../../models/ExpenseData";
import ExpenseCard from "./ExpenseCard";

import { AllExpensesResponseData } from "../../models/AllExpensesResponseData";
import PageNavigation from "./PageNavigation";
import { usePlannedExpensesContext } from "../../context/PlannedExpenseContext";

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
  const { GetExpenses } = useExpensesContext();
  const { GetPlannedExpenses } = usePlannedExpensesContext();
  useEffect(() => {
    const LoadExpenses = async () => {
      const data: AllExpensesResponseData =
        category === "All"
          ? type === ExpenseHistoryType.PlannedExpenses
            ? await GetPlannedExpenses(page, itemsPerPage, sorting)
            : await GetExpenses(page, itemsPerPage, sorting)
          : type === ExpenseHistoryType.PlannedExpenses
          ? await GetPlannedExpenses(page, itemsPerPage, sorting, category)
          : await GetExpenses(page, itemsPerPage, sorting, category);
      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    };
    LoadExpenses();
  }, [GetExpenses, setExpenses, setTotalPages, sorting, category, page, type]);
  return (
    <div className="flex items-center justify-start flex-col gap-1 w-full">
      {/* Filters */}
      <div className="flex items-end justify-center gap-4 w-full">
        <div className="flex flex-col items-start justify-center flex-shrink-0">
          <p className="ml-2 text-sm">Category:</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            id="category"
            className="cursor-pointer bg-background-50 hover:bg-background-100 transition-all border border-background-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
          >
            <option value={"All"}>All</option>

            {categories.map((category, idx) => (
              <option key={idx} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSorting((prev) =>
              prev === SortType.DateDesc ? SortType.DateAsc : SortType.DateDesc
            );
          }}
          className="bg-background-50 border flex items-center justify-start hover:bg-background-100 transition-all border-background-300 rounded-lg py-1.5 px-2 w-full max-w-40 gap-1"
        >
          Date
          {sorting === SortType.DateDesc ? (
            <IoCaretDown />
          ) : sorting === SortType.DateAsc ? (
            <IoCaretUp />
          ) : (
            ""
          )}
        </button>
        <button
          onClick={() => {
            setSorting((prev) =>
              prev === SortType.CostDesc ? SortType.CostAsc : SortType.CostDesc
            );
          }}
          className="bg-background-50 border flex items-center justify-start hover:bg-background-100 transition-all border-background-300 rounded-lg py-1.5 px-2 w-full max-w-40 gap-1"
        >
          Cost
          {sorting === SortType.CostDesc ? (
            <IoCaretDown />
          ) : sorting === SortType.CostAsc ? (
            <IoCaretUp />
          ) : (
            ""
          )}
        </button>
      </div>
      {/* Filters end */}
      <div className="-mt-3" />
      <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />
      <div className="-mb-3" />
      <div className="flex flex-col justify-start items-center w-full gap-3 mt-4 ">
        {expenses.map((expense, idx) => (
          <ExpenseCard data={expense} key={idx} />
        ))}
      </div>
      <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default ExpensesHistory;
