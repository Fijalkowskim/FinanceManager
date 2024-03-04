import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { GetCategoryData } from "../../data/Categories";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  title?: string;
  costPerCategory: [{ category: string; cost: number }];
}

interface ChartDataWithDatasets extends ChartData<"pie", number[], unknown> {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
}
const legendOptions = {
  position: "top" as const,
  align: "center" as const,
  labels: {
    boxWidth: 10,
    padding: 10,
  },
};
function MonthChart({ title, costPerCategory }: Props) {
  const [chartData, setChartData] = useState<ChartDataWithDatasets>();
  useEffect(() => {
    const newData: ChartDataWithDatasets = {
      labels: costPerCategory.map((cost) => cost.category),
      datasets: [
        {
          label: "Cost in $",
          data: costPerCategory.map((cost) => cost.cost),
          backgroundColor: costPerCategory.map(
            (cost) => GetCategoryData(cost.category).color
          ),
          borderColor: costPerCategory.map(
            (cost) => GetCategoryData(cost.category).color
          ),
        },
      ],
    };
    setChartData(newData);
  }, costPerCategory);
  return (
    <div className="aspect-square w-[9999px] lg:max-w-lg max-w-[100%] flex-shrink flex items-center justify-center">
      {chartData && (
        <Pie
          data={chartData}
          style={{ width: "100%", height: "100%" }}
          options={{ plugins: { legend: legendOptions } }}
        />
      )}
    </div>
  );
}

export default MonthChart;
