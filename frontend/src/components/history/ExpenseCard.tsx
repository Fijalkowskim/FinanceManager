import React from "react";
import { ExpenseData } from "../../models/ExpenseData";
import { GetCategoryData } from "../../categories/Categories";
import dateFormat from "dateformat";
import { AnimatePresence, motion } from "framer-motion";
import CustomButton from "../general/CustomButton";
import { NavLink } from "react-router-dom";
import { useExpensesContext } from "../../context/ExpensesContext";
import { ResponseStatusData } from "../../models/ResponseStatusData";
import { ExpenseType } from "../../models/ExpenseType";
interface Props {
  expense: ExpenseData;
  planned?: boolean;
  details?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}
function ExpenseCard({ expense, planned, details, onClick, onDelete }: Props) {
  const { DeleteExpense } = useExpensesContext();
  const tryDeleteExpense = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const response: ResponseStatusData = await DeleteExpense(
      expense.id,
      planned ? ExpenseType.planned : ExpenseType.normal
    );
    if (response.status < 300) {
      onDelete && onDelete();
    }
  };
  return (
    <motion.button
      layout
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      className="shadow-sm bg-background-50 w-full max-w-2xl p-3 border-background-300/50 border text-left"
    >
      <motion.div
        layout
        className="flex items-center justify-start gap-3 w-full"
      >
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
                  ? "text-xs mb-1 sm:text-sm"
                  : "text-sm sm:text-base"
              }`}
            >
              {expense.category}
            </p>
          </div>
        </div>
        <div></div>
        {details ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex  items-center justify-center gap-3"
          >
            <NavLink
              to={`/Finance-Manager/${planned ? "edit-planned" : "edit"}/${
                expense.id
              }`}
            >
              <CustomButton
                className="w-20"
                variant={"primary"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Edit
              </CustomButton>
            </NavLink>
            <CustomButton className="w-20" onClick={tryDeleteExpense}>
              Delete
            </CustomButton>
          </motion.div>
        ) : (
          <motion.p className="truncate text-background-800">
            {expense.description === "" ? "-" : expense.description}
          </motion.p>
        )}
        <p className="text-xl ml-auto truncate flex-shrink-0 max-w-20">
          {expense.cost}$
        </p>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {details && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2"
          >
            {expense.description === "" ? "-" : expense.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ExpenseCard;
