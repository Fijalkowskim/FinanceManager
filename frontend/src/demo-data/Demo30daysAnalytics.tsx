import { subDays } from "date-fns";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";

export const Demo30daysAnalytics: DailyAnalyticsData = {
  dataType: AnalyticsDataType.daily,
  startDate: new Date("2024-02-05T00:00:00.988081"),
  endDate: new Date("2024-03-06T13:55:05.988081"),
  previousStartDate: new Date("2024-01-06T00:00:00.988081"),
  previousEndDate: new Date("2024-02-04T23:59:59.988081"),
  totalCosts: 388.94,
  totalPreviousCosts: 442.24,
  comparedToPreviousCosts: "-12.05%",
  costsPerCategory: [
    {
      category: "Transportation",
      cost: 61.75,
    },
    {
      category: "Utilities",
      cost: 50.0,
    },
    {
      category: "Healthcare",
      cost: 60.0,
    },
    {
      category: "Entertainment",
      cost: 12.99,
    },
    {
      category: "Clothing",
      cost: 35.2,
    },
    {
      category: "Travel",
      cost: 120.0,
    },
    {
      category: "Other",
      cost: 8.5,
    },
    {
      category: "Groceries",
      cost: 40.5,
    },
  ],
  topCategory: {
    category: "Travel",
    cost: 120.0,
  },
  costsPerDate: [
    {
      cost: 12.989999771118164,
      date: new Date("2024-02-07T23:00:00.000+00:00"),
    },
    {
      cost: 25.0,
      date: new Date("2024-02-09T23:00:00.000+00:00"),
    },
    {
      cost: 8.5,
      date: new Date("2024-02-11T23:00:00.000+00:00"),
    },
    {
      cost: 15.75,
      date: new Date("2024-02-14T23:00:00.000+00:00"),
    },
    {
      cost: 35.20000076293945,
      date: new Date("2024-02-17T23:00:00.000+00:00"),
    },
    {
      cost: 90.25,
      date: new Date("2024-02-19T23:00:00.000+00:00"),
    },
    {
      cost: 120.0,
      date: new Date("2024-02-21T23:00:00.000+00:00"),
    },
    {
      cost: 81.25,
      date: new Date("2024-02-29T23:00:00.000+00:00"),
    },
  ],
  previousCostsPerDate: [
    {
      cost: 40.0,
      date: new Date("2024-01-07T23:00:00.000+00:00"),
    },
    {
      cost: 25.989999771118164,
      date: new Date("2024-01-11T23:00:00.000+00:00"),
    },
    {
      cost: 60.75,
      date: new Date("2024-01-13T23:00:00.000+00:00"),
    },
    {
      cost: 300.0,
      date: new Date("2024-01-17T23:00:00.000+00:00"),
    },
    {
      cost: 15.5,
      date: new Date("2024-01-29T23:00:00.000+00:00"),
    },
  ],
};
