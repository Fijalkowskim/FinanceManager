import React from "react";
import { ExpenseData } from "../../models/expenses/ExpenseData";
import dateFormat from "dateformat";
import { motion } from "framer-motion";
interface Props {
  expense: ExpenseData;
}
function UpcomingExpenseCard({ expense }: Props) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center rounded-md justify-start gap-3 shadow-sm bg-primary-100 w-full max-w-2xl p-3 border-background-300/50 border text-left"
    >
      <p
        className={`text-sm ${
          expense.date < new Date() ? "text-red-500 font-semibold" : ""
        }`}
      >
        {dateFormat(expense.date, "dd.mm.yyyy")}
      </p>

      <div></div>
      <p className="truncate text-background-800 text-base">
        {expense.description === "" ? "-" : expense.description}
      </p>
      <p className="text-xl ml-auto truncate flex-shrink-0 max-w-20">
        {expense.cost.toFixed(2)}$
      </p>
    </motion.div>
  );
}

export default UpcomingExpenseCard;
