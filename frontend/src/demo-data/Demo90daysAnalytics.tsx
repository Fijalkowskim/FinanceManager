import { subDays } from "date-fns";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";

export const Demo90daysAnalytics: DailyAnalyticsData = {
  dataType: AnalyticsDataType.daily,
  startDate: new Date("2023-12-07T00:00:00.8599586"),
  endDate: new Date("2024-03-06T13:56:31.8599586"),
  previousStartDate: new Date("2023-09-08T00:00:00.8599586"),
  previousEndDate: new Date("2023-12-06T23:59:59.8599586"),
  totalCosts: 1026.68,
  totalPreviousCosts: 12.5,
  comparedToPreviousCosts: "+8113.44%",
  costsPerCategory: [
    {
      category: "Groceries",
      cost: 141.75,
    },
    {
      category: "Utilities",
      cost: 90.0,
    },
    {
      category: "Transportation",
      cost: 61.75,
    },
    {
      category: "Healthcare",
      cost: 160.0,
    },
    {
      category: "Entertainment",
      cost: 38.98,
    },
    {
      category: "Clothing",
      cost: 90.2,
    },
    {
      category: "Travel",
      cost: 420.0,
    },
    {
      category: "Other",
      cost: 24.0,
    },
  ],
  topCategory: {
    category: "Travel",
    cost: 420.0,
  },
  costsPerDate: [
    {
      cost: 55.0,
      date: new Date("2024-01-01T23:00:00.000+00:00"),
    },
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
    {
      cost: 140.5,
      date: new Date("2024-02-04T23:00:00.000+00:00"),
    },
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
      cost: 12.5,
      date: new Date("2023-09-27T22:00:00.000+00:00"),
    },
  ],
};
