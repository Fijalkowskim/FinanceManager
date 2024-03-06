import { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import {
  compareDates,
  generateDaysArray,
  monthIndexToName,
} from "../helpers/helpers";
import { format } from "date-fns";
import { DailyDataModel } from "../models/charts/DailyDataModel";
import { AnnualDataModel } from "../models/charts/AnnualDataModel";

export const useBarChartData = (
  dailyData?: DailyDataModel,
  annualData?: AnnualDataModel[]
) => {
  const [chartData, setChartData] = useState<ChartData<"bar">>();
  useEffect(() => {
    let newChartData: ChartData<"bar">;
    if (dailyData) {
      const daysArray: Date[] = generateDaysArray(
        dailyData.startDate,
        dailyData.endDate
      );
      newChartData = {
        labels: daysArray.map((date) => format(date, "dd.MM.yyyy")),
        datasets: dailyData.data.map((entry) => ({
          label: entry.label,
          data: daysArray.map((date) => {
            const found = entry.costs.find((cost) =>
              compareDates(date, cost.date)
            );
            return found ? found.cost : 0;
          }),
          backgroundColor: entry.barColor,
        })),
      };
      setChartData(newChartData);
    } else if (annualData) {
      const monthsArray: number[] = [...Array(12).keys()];
      newChartData = {
        labels: monthsArray.map((month) => monthIndexToName(month)),
        datasets: annualData.map((entry) => ({
          label: entry.label,
          data: monthsArray.map((month) => {
            const found = entry.costs.find((cost) => cost.month === month + 1);
            return found ? found.cost : 0;
          }),
          backgroundColor: entry.barColor,
        })),
      };
      setChartData(newChartData);
    }
  }, [dailyData, annualData]);
  return { chartData };
};
