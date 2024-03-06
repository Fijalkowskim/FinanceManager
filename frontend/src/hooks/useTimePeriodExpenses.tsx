import { useEffect, useState } from "react";
import { DailyDataModel } from "../models/charts/DailyDataModel";
import { AnnualDataModel } from "../models/charts/AnnualDataModel";
import { AnalyticsData } from "../models/analytics/AnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";
import { defaultBarColor } from "../data/BarColors";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";

function useTimePeriodExpenses(analyticsDashboard: AnalyticsData) {
  const [dailyData, setDailyData] = useState<DailyDataModel>();
  const [annualData, setAnnualData] = useState<AnnualDataModel[]>();
  useEffect(() => {
    switch (analyticsDashboard.dataType) {
      case AnalyticsDataType.annual:
        const newAnnualData: AnnualDataModel[] = [
          {
            costs: (analyticsDashboard as AnnualAnalyticsData).costsPerMonth,
            label: "Cost in $",
            barColor: defaultBarColor,
          },
        ];
        setAnnualData(newAnnualData);
        setDailyData(undefined);
        break;
      case AnalyticsDataType.daily:
        const newDailyData: DailyDataModel = {
          startDate: analyticsDashboard.startDate,
          endDate: analyticsDashboard.endDate,
          data: [
            {
              costs: (analyticsDashboard as DailyAnalyticsData).costsPerDate,
              label: "Cost in $",
              barColor: defaultBarColor,
            },
          ],
        };
        setDailyData(newDailyData);
        setAnnualData(undefined);
        break;
    }
  }, [analyticsDashboard, setAnnualData, setDailyData]);

  return { dailyData, annualData, defaultBarColor };
}

export default useTimePeriodExpenses;
