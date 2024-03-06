import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useBarChartData } from "../../hooks/useBarChartData";
import { DailyDataModel } from "../../models/charts/DailyDataModel";
import { AnnualDataModel } from "../../models/charts/AnnualDataModel";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  dailyData?: DailyDataModel;
  annualData?: AnnualDataModel[];
  legendVisible?: boolean;
}
export default function TimePeriodExpensesChart({
  dailyData,
  annualData,
  legendVisible,
}: Props) {
  const { chartData } = useBarChartData(dailyData, annualData);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: legendVisible,
      },
    },
  };
  return (
    <div className="w-full h-full">
      {chartData ? (
        <Bar
          options={options}
          data={chartData}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p>No chart data available</p>
      )}
    </div>
  );
}
