import React, { useState } from "react";
import { categories } from "../../categories/Categories";
import CustomButton from "../general/CustomButton";
import { useExpensesContext } from "../../context/ExpensesContext";

function ExpenseForm() {
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].name);
  const { AddExpense } = useExpensesContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (cost === "" || category === "") return;
        try {
          AddExpense(parseFloat(cost), category, description);
          setCost("");
          setDescription("");
          setCategory(categories[0].name);
        } catch (err) {
          console.log(err);
        }
      }}
      className="bg-background-50 shadow-md  rounded-md p-5 flex flex-col items-center justify-center text-center max-w-sm w-full"
    >
      <h1 className="text-4xl font-extralight text-primary-700 mb-1">
        New expense
      </h1>
      <div className="w-full h-[0.1px] bg-primary-950/30 mb-2" />
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
    </form>
  );
}

export default ExpenseForm;
