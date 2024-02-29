import React, { useState } from "react";
import { categories } from "../../categories/Categories";
import CustomButton from "../general/CustomButton";
import { useExpensesContext } from "../../context/ExpensesContext";
import MessagePopup from "../general/MessagePopup";
import { AnimatePresence, motion } from "framer-motion";

function AddExpenseForm() {
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const [errorMessage, setErrorMessage] = useState("");
  const { AddExpense } = useExpensesContext();
  const clearErrorMessage = () => {
    setErrorMessage("");
  };
  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        clearErrorMessage();
        if (cost === "" || category === "" || parseFloat(cost) >= 10000) {
          if (parseFloat(cost) >= 10000)
            setErrorMessage("Expense cost must be below 10000$");
          return;
        }
        try {
          AddExpense(parseFloat(cost), category, description);
          setCost("");
          setDescription("");
          setCategory(categories[0].name);
        } catch (err) {
          console.log(err);
        }
      }}
      layout
      className="bg-background-50 shadow-md  rounded-md p-5 flex flex-col items-center justify-center text-center max-w-sm w-full"
    >
      <h1 className="text-4xl font-extralight text-primary-700 mb-1">
        New expense
      </h1>
      <div className="w-full h-[0.1px] bg-primary-950/30 mb-2" />
      <AnimatePresence>
        {errorMessage !== "" && (
          <MessagePopup message={errorMessage} setMessage={setErrorMessage} />
        )}
      </AnimatePresence>
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
          clearErrorMessage();
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
          clearErrorMessage();
          setCategory(e.target.value);
        }}
        name="category"
        id="category"
        className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-2"
      >
        {categories.map((category, idx) => (
          <option value={category.name}>{category.name}</option>
        ))}
      </select>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows={8}
        value={description}
        onChange={(e) => {
          clearErrorMessage();
          setDescription(e.target.value);
        }}
        className="p-3 shadow-sm rounded-lg border border-gray-300 mb-2 w-full resize-none"
      />
      <CustomButton
        variant={"primary"}
        parentClass="w-full"
        className="w-full text-xl"
      >
        Add
      </CustomButton>
    </motion.form>
  );
}

export default AddExpenseForm;
