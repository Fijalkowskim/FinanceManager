import React from "react";
import AddExpenseForm from "../components/add-expense/AddExpenseForm";
import { useParams } from "react-router-dom";

function AddExpense() {
  const { planned } = useParams();
  return (
    <div className="min-h-screen flex items-start justify-center p-2 pt-20">
      <AddExpenseForm planned={planned === "planned"} />
    </div>
  );
}

export default AddExpense;
