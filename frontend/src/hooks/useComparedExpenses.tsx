import { useEffect, useState } from "react";
import { DailyDataModel } from "../models/charts/DailyDataModel";
import { AnnualDataModel } from "../models/charts/AnnualDataModel";
import { AnalyticsData } from "../models/analytics/AnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";
import { comparedBarColor, defaultBarColor } from "../data/BarColors";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
import { useAnalyticsContext } from "../context/AnalyticsContext";

function useTimeComparedExpenses(analyticsDashboard: AnalyticsData) {
  const [dailyData, setDailyData] = useState<DailyDataModel>();
  const [annualData, setAnnualData] = useState<AnnualDataModel[]>();
  const { range } = useAnalyticsContext();
  useEffect(() => {
    switch (analyticsDashboard.dataType) {
      case AnalyticsDataType.annual:
        const newAnnualData: AnnualDataModel[] = [
          {
            costs: (analyticsDashboard as AnnualAnalyticsData)
              .previousCostsPerMonth,
            label: range.comparedToPreviousText,
            barColor: comparedBarColor,
          },
          {
            costs: (analyticsDashboard as AnnualAnalyticsData).costsPerMonth,
            label: range.filterText,
            barColor: defaultBarColor,
          },
        ];
        setAnnualData(newAnnualData);
        setDailyData(undefined);
        break;
      case AnalyticsDataType.daily:
        const newDailyData: DailyDataModel = {
          startDate: analyticsDashboard.previousStartDate,
          endDate: analyticsDashboard.endDate,
          data: [
            {
              costs: (analyticsDashboard as DailyAnalyticsData)
                .previousCostsPerDate,
              label: range.comparedToPreviousText,
              barColor: comparedBarColor,
            },
            {
              costs: (analyticsDashboard as DailyAnalyticsData).costsPerDate,
              label: range.filterText,
              barColor: defaultBarColor,
            },
          ],
        };
        setDailyData(newDailyData);
        setAnnualData(undefined);
        break;
    }
  }, [analyticsDashboard, setAnnualData, setDailyData, range]);

  return { dailyData, annualData, defaultBarColor };
}

export default useTimeComparedExpenses;
