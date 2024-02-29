import React from "react";
import { ExpenseData } from "../../models/ExpenseData";
import dateFormat from "dateformat";
import { GetCategoryData } from "../../categories/Categories";
interface Props {
  expense: ExpenseData;
}
function UpcomingExpenseCard({ expense }: Props) {
  return (
    <button className="flex items-center rounded-md justify-start gap-3 shadow-sm bg-primary-100 w-full max-w-2xl p-3 border-background-300/50 border text-left">
      <p
        className={`text-sm ${
          expense.date < new Date() ? "text-red-500 font-semibold" : ""
        }`}
      >
        {dateFormat(expense.date, "dd.mm.yyyy")}
      </p>

      <div></div>
      <p className="truncate text-background-800 text-base">
        {expense.description}
      </p>
      <p className="text-xl ml-auto truncate flex-shrink-0 max-w-20">
        {expense.cost}$
      </p>
    </button>
  );
}

export default UpcomingExpenseCard;
