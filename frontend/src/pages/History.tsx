import React from "react";
import ExpensesHistory, {
  ExpenseHistoryType,
} from "../components/history/ExpensesHistory";

function History() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-4 text-center gap-2 p-2 pb-10 overflow-hidden w-screen">
      <h1 className="text-4xl  ">Expenses history</h1>
      <ExpensesHistory type={ExpenseHistoryType.Expenses} />
    </div>
  );
}

export default History;
