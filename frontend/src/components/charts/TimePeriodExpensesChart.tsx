import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AnalyticsData } from "../../models/analytics/AnalyticsData";
import {
  compareDates,
  monthIndexToName,
  monthNames,
} from "../../helpers/helpers";
import { differenceInDays, format } from "date-fns";
import { AnalyticsDataType } from "../../models/analytics/AnalyticsDataType";
import { DailyAnalyticsData } from "../../models/analytics/DailyAnalyticsData";
import { AnnualAnalyticsData } from "../../models/analytics/AnnualAnalyticsData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
  },
};

const chartBarColor = "#1f83e0";

interface Props {
  analyticsDashboardData: AnalyticsData;
}

export default function TimePeriodExpensesChart({
  analyticsDashboardData,
}: Props) {
  const [chartData, setChartData] = useState<ChartData<"bar">>();

  useEffect(() => {
    let newChartData: ChartData<"bar">;

    if (analyticsDashboardData.dataType === AnalyticsDataType.daily) {
      const daysArray: Date[] = Array.from(
        {
          length:
            differenceInDays(
              analyticsDashboardData.endDate,
              analyticsDashboardData.startDate
            ) + 1,
        },
        (_, index) => {
          const date = new Date(analyticsDashboardData.startDate);
          date.setDate(analyticsDashboardData.startDate.getDate() + index);
          return date;
        }
      );
      newChartData = {
        labels: daysArray.map((date) => format(date, "dd.MM.yyyy")),
        datasets: [
          {
            label: "Cost in $",
            data: daysArray.map((date) => {
              const found = (
                analyticsDashboardData as DailyAnalyticsData
              ).costsPerDate.find((cost) => compareDates(date, cost.date));
              return found ? found.cost : 0;
            }),
            backgroundColor: chartBarColor,
          },
        ],
      };
      setChartData(newChartData);
    } else if (analyticsDashboardData.dataType === AnalyticsDataType.annual) {
      const monthsArray: number[] = [...Array(12).keys()];
      newChartData = {
        labels: monthsArray.map((month) => monthIndexToName(month)),
        datasets: [
          {
            label: "Cost in $",
            data: monthsArray.map((month) => {
              const found = (
                analyticsDashboardData as AnnualAnalyticsData
              ).costsPerMonth.find((cost) => cost.month === month + 1);
              return found ? found.cost : 0;
            }),
            backgroundColor: chartBarColor,
          },
        ],
      };
      setChartData(newChartData);
    }
  }, [analyticsDashboardData]);
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
