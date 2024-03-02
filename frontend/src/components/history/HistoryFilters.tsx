import React from "react";
import { categories } from "../../categories/Categories";
import { SortType } from "../../models/SortType";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { useExpenseHistoryContext } from "../../context/ExpenseHistoryContext";

function HistoryFilters() {
  const { category, setCategory, sorting, setSorting } =
    useExpenseHistoryContext();
  return (
    <div className="flex items-end justify-center gap-4 w-full">
      <div className="flex flex-col items-start justify-center flex-shrink-0">
        <p className="ml-2 text-sm">Category:</p>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          name="category"
          id="category"
          className="cursor-pointer bg-background-50 hover:bg-background-100 transition-all border border-background-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
        >
          <option value={"All"}>All</option>

          {categories.map((category, idx) => (
            <option key={idx} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setSorting((prev) =>
            prev === SortType.DateDesc ? SortType.DateAsc : SortType.DateDesc
          );
        }}
        className="bg-background-50 border flex items-center justify-start hover:bg-background-100 transition-all border-background-300 rounded-lg py-1.5 px-2 w-full max-w-40 gap-1"
      >
        Date
        {sorting === SortType.DateDesc ? (
          <IoCaretDown />
        ) : sorting === SortType.DateAsc ? (
          <IoCaretUp />
        ) : (
          ""
        )}
      </button>
      <button
        onClick={() => {
          setSorting((prev) =>
            prev === SortType.CostDesc ? SortType.CostAsc : SortType.CostDesc
          );
        }}
        className="bg-background-50 border flex items-center justify-start hover:bg-background-100 transition-all border-background-300 rounded-lg py-1.5 px-2 w-full max-w-40 gap-1"
      >
        Cost
        {sorting === SortType.CostDesc ? (
          <IoCaretDown />
        ) : sorting === SortType.CostAsc ? (
          <IoCaretUp />
        ) : (
          ""
        )}
      </button>
    </div>
  );
}

export default HistoryFilters;
