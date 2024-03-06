import { subDays } from "date-fns";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";

export const Demo7daysAnalytics: DailyAnalyticsData = {
  dataType: AnalyticsDataType.daily,
  startDate: subDays(new Date(), 7),
  endDate: new Date(),
  previousStartDate: subDays(new Date(), 15),
  previousEndDate: subDays(new Date(), 8),
  totalCosts: 81.25,
  totalPreviousCosts: 120.0,
  comparedToPreviousCosts: "-32,29%",
  costsPerCategory: [
    {
      category: "Groceries",
      cost: 40.5,
    },
    {
      category: "Utilities",
      cost: 25.0,
    },
    {
      category: "Transportation",
      cost: 15.75,
    },
  ],
  topCategory: {
    category: "Groceries",
    cost: 40.5,
  },
  costsPerDate: [
    {
      cost: 81.25,
      date: subDays(new Date(), 3),
    },
  ],
  previousCostsPerDate: [
    {
      cost: 120.0,
      date: subDays(new Date(), 13),
    },
  ],
};
