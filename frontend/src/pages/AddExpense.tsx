import React from "react";
import ExpenseForm from "../components/expense-form/ExpenseForm";

function AddExpense() {
  return (
    <div className="min-h-screen flex items-start justify-center p-2 pt-20">
      <ExpenseForm />
    </div>
  );
}

export default AddExpense;
