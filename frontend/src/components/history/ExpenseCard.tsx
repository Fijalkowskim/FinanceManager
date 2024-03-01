import React from "react";
import { ExpenseData } from "../../models/ExpenseData";
import { GetCategoryData } from "../../categories/Categories";
import dateFormat from "dateformat";
interface Props {
  expense: ExpenseData;
}
function ExpenseCard({ expense }: Props) {
  return (
    <button className="flex items-center justify-start gap-3 shadow-sm bg-background-50 w-full max-w-2xl p-3 border-background-300/50 border text-left">
      <div className="sm:w-32 w-[6.6rem] overflow-hidden flex-shrink-0">
        <p className="text-sm ">{dateFormat(expense.date, "dd.mm.yyyy")}</p>
        <div
          className="flex items-center justify-start gap-1 text-lg "
          style={{ color: GetCategoryData(expense.category).color }}
        >
          <div className="flex-shrink-0">
            {GetCategoryData(expense.category).icon}
          </div>
          <p
            className={`${
              expense.category.length >= 10
                ? "text-xs sm:text-sm"
                : "text-sm sm:text-base"
            }`}
          >
            {expense.category}
          </p>
        </div>
      </div>
      <div></div>
      <p className="truncate text-background-800">
        {expense.description === "" ? "-" : expense.description}
      </p>
      <p className="text-xl ml-auto truncate flex-shrink-0 max-w-20">
        {expense.cost}$
      </p>
    </button>
  );
}

export default ExpenseCard;
