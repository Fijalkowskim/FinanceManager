import React, { useState } from "react";
import { SortType } from "../../models/SortType";
import { ExpenseData } from "../../models/ExpenseData";
import ExpenseCard from "./ExpenseCard";
import PageNavigation from "./PageNavigation";
import HistoryFilters from "./HistoryFilters";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import MessagePopup from "../general/MessagePopup";
import { usePopupContext } from "../../context/PopupContext";
import { useExpenses } from "../../hooks/useExpenses";

export enum ExpenseHistoryType {
  Expenses,
  PlannedExpenses,
}
interface Props {
  type: ExpenseHistoryType;
}

function ExpensesHistory({ type }: Props) {
  const [category, setCategory] = useState("All");
  const [sorting, setSorting] = useState<SortType>(SortType.DateDesc);
  const [page, setPage] = useState(0);
  const [totalPages] = useState(0);
  const [itemsPerPage] = useState(20);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData>();
  const [deletedExpense, setDeletedExpense] = useState<ExpenseData>();
  const { infoMessage, setInfoMessage } = usePopupContext();

  const { expenses } = useExpenses({
    page,
    itemsPerPage,
    sorting,
    type,
    category,
    deletedExpense,
  });
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
      <div className="mt-1" />
      <AnimatePresence>
        {infoMessage && <MessagePopup message={infoMessage} />}
      </AnimatePresence>
      <div className="-mb-3" />
      {expenses.length > 0 && (
        <PageNavigation page={page} totalPages={totalPages} setPage={setPage} />
      )}
      <div className="-mb-3" />
      <motion.div
        layout
        className="flex flex-col justify-start items-center w-full gap-3 mt-4 "
      >
        <AnimatePresence mode="popLayout">
          {expenses.map((expense) => (
            <ExpenseCard
              expense={expense}
              key={expense.id}
              planned={type === ExpenseHistoryType.PlannedExpenses}
              details={selectedExpense === expense}
              onClick={() => {
                setSelectedExpense((prev) =>
                  prev === expense ? undefined : expense
                );
              }}
              onDelete={() => {
                setDeletedExpense(expense);
                setInfoMessage("Expense deleted successfully");
                setTimeout(() => {
                  setInfoMessage("");
                }, 2000);
              }}
              onPaid={() => {}}
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
