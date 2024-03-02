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
  const { infoMessage, setInfoMessage } = usePopupContext();
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
      <AnimatePresence>
        {infoMessage && <MessagePopup message={infoMessage} />}
      </AnimatePresence>
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
