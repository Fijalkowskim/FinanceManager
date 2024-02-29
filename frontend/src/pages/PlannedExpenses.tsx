import React from "react";
import ExpensesHistory, {
  ExpenseHistoryType,
} from "../components/history/ExpensesHistory";

function PlannedExpenses() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-4 text-center gap-2 p-2 pb-4">
      <h1 className="text-4xl  ">Planned expenses</h1>
      <ExpensesHistory type={ExpenseHistoryType.PlannedExpenses} />
    </div>
  );
}

export default PlannedExpenses;
