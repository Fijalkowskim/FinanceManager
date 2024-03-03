import React from "react";
import ExpenseCard from "./ExpenseCard";
import PageNavigation from "./PageNavigation";
import HistoryFilters from "./HistoryFilters";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import { useExpenses } from "../../hooks/useExpenses";
import PopupController from "../general/PopupController";

export enum ExpenseHistoryType {
  Expenses,
  PlannedExpenses,
}
interface Props {
  type: ExpenseHistoryType;
}

function ExpensesHistory({ type }: Props) {
  const { expenses } = useExpenses(type);

  return (
    <div className="flex items-center justify-start flex-col gap-1 w-full overflow-hidden">
      {type === ExpenseHistoryType.PlannedExpenses && (
        <NavLink to="/Finance-Manager/plan">
          <CustomButton variant={"primary"}>Add planned expense</CustomButton>
        </NavLink>
      )}
      <HistoryFilters />
      <div className="mt-1" />
      <PopupController />
      <div className="-mb-3" />
      {expenses.length > 0 && <PageNavigation />}
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
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {expenses.length === 0 && <p>No expesnses yet</p>}
      {expenses.length > 0 && <PageNavigation />}
    </div>
  );
}

export default ExpensesHistory;
