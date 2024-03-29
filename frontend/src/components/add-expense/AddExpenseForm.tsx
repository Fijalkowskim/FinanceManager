import React, { useEffect, useState } from "react";
import { categories } from "../../data/Categories";
import CustomButton from "../general/CustomButton";
import { useExpensesContext } from "../../context/ExpensesContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ResponseStatusData } from "../../models/api/ResponseStatusData";
import { usePopupContext } from "../../context/PopupContext";
import { ExpenseType } from "../../models/expenses/ExpenseType";
import PopupController from "../general/PopupController";
interface Props {
  planned?: boolean;
  edit?: boolean;
  editId?: number;
}
function AddExpenseForm({ planned, edit, editId }: Props) {
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].name);

  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const { AddExpense, GetExpense, UpdateExpense } = useExpensesContext();

  const { setErrorMessage, setInfoMessage, clearMessages } = usePopupContext();

  useEffect(() => {
    const loadExpense = async () => {
      if (edit && editId) {
        const expense = await GetExpense(
          editId,
          planned ? ExpenseType.planned : ExpenseType.normal
        );
        if (expense) {
          setCost(expense.cost.toString());
          setCategory(expense.category);
          setDescription(expense.description);
          setDate(expense.date);
        }
      }
    };
    loadExpense();
  }, [edit, editId, GetExpense, planned]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();
    if (cost === "" || category === "" || parseFloat(cost) >= 10000) {
      if (parseFloat(cost) >= 10000)
        setErrorMessage("Expense cost must be below 10000$");
      return;
    }
    try {
      const body = {
        cost: parseFloat(cost),
        category,
        description,
        date,
      };
      const response: ResponseStatusData =
        edit && editId
          ? await UpdateExpense(
              editId,
              body,
              planned ? ExpenseType.planned : ExpenseType.normal
            )
          : await AddExpense(
              body,
              planned ? ExpenseType.planned : ExpenseType.normal
            );
      if (response.status >= 300) {
        setErrorMessage(response.message);
        return;
      }
      setInfoMessage(response.message);
      setCost("");
      setDescription("");
      if (edit) {
        navigate(`/Finance-Manager/${planned ? "planned" : "history"}`);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Enter valid number");
    }
  };
  return (
    <motion.form
      onSubmit={submitForm}
      layout
      className="bg-background-50 shadow-md  rounded-md p-5 flex flex-col items-center justify-center text-center max-w-sm w-full"
    >
      <h1 className="text-4xl font-extralight text-primary-700 mb-1">
        {`${edit ? `Edit` : planned ? "Plan" : "New"} expense`}
      </h1>

      <div className="w-full h-[0.1px] bg-primary-950/30 mb-2" />
      <PopupController />
      <label htmlFor="cost">Cost in $</label>
      <input
        min={0.01}
        name="cost"
        id="cost"
        type="number"
        step="0.01"
        required
        value={cost}
        onChange={(e) => {
          clearMessages();
          const validated = e.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
          if (validated) {
            setCost(e.target.value);
          }
        }}
        className="p-3 shadow-sm rounded-lg border border-gray-300 mb-2 w-full"
      />
      <label htmlFor="category">Category</label>
      <select
        value={category}
        onChange={(e) => {
          clearMessages();
          setCategory(e.target.value);
        }}
        name="category"
        id="category"
        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-2"
      >
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="date">Date</label>
      <input
        required
        type="date"
        value={date.toISOString().split("T")[0]}
        min={planned ? new Date().toISOString().split("T")[0] : undefined}
        max={!planned ? new Date().toISOString().split("T")[0] : undefined}
        onChange={(e) => {
          clearMessages();
          const selectedDate = new Date(e.target.value);
          setDate(selectedDate);
        }}
        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-2"
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows={8}
        value={description}
        onChange={(e) => {
          clearMessages();
          setDescription(e.target.value);
        }}
        className="p-3 shadow-sm rounded-lg border border-gray-300 mb-2 w-full resize-none"
      />
      <CustomButton
        variant={"primary"}
        parentClass="w-full"
        className="w-full text-xl"
      >
        {`${edit ? "Edit" : "Add"}`}
      </CustomButton>
    </motion.form>
  );
}

export default AddExpenseForm;
