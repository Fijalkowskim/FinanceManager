import React, { useEffect, useState } from "react";
import { categories } from "../../data/Categories";
import { useAnalyticsContext } from "../../context/AnalyticsContext";
import { analyticsRanges } from "../../data/AnalyticsRanges";

function AnalyticsFilter() {
  const {
    category,
    setCategory,
    range,
    setRangeByString,
    setRange,
    getYearsWithExpenses,
  } = useAnalyticsContext();

  const [yearsWithExpenses, setYearsWithExpenses] = useState<number[]>([]);

  useEffect(() => {
    const fetchYearsWithExpenses = async () => {
      const res = await getYearsWithExpenses();
      setYearsWithExpenses(res);
    };
    fetchYearsWithExpenses();
  }, [setYearsWithExpenses, getYearsWithExpenses]);

  return (
    <div className="flex items-end justify-center gap-4 w-full flex-wrap">
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
      <div className="flex flex-col items-start justify-center flex-shrink-0">
        <p className="ml-2 text-sm">Range:</p>
        <select
          value={range.filterText}
          onChange={(e) => {
            setRangeByString(e.target.value);
          }}
          name="range"
          id="range"
          className="cursor-pointer bg-background-50 hover:bg-background-100 transition-all border border-background-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 w-[10rem]"
        >
          {analyticsRanges.map((range, idx) => (
            <option key={idx} value={range.filterText}>
              {range.filterText}
            </option>
          ))}
          {yearsWithExpenses.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AnalyticsFilter;
