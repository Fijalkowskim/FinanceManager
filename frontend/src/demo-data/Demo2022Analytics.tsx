import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";

export const Demo2022Analytics: AnnualAnalyticsData = {
  dataType: AnalyticsDataType.annual,
  startDate: new Date("2022-01-01T00:00:00"),
  endDate: new Date("2022-12-31T23:59:59"),
  previousStartDate: new Date("2021-01-01T00:00:00"),
  previousEndDate: new Date("2021-12-31T23:59:59"),
  totalCosts: 452.24,
  totalPreviousCosts: 0.0,
  comparedToPreviousCosts: "+100.00%",
  costsPerCategory: [
    {
      category: "Groceries",
      cost: 50.25,
    },
    {
      category: "Utilities",
      cost: 30.0,
    },
    {
      category: "Transportation",
      cost: 20.5,
    },
    {
      category: "Healthcare",
      cost: 80.0,
    },
    {
      category: "Entertainment",
      cost: 15.99,
    },
    {
      category: "Clothing",
      cost: 45.5,
    },
    {
      category: "Travel",
      cost: 200.0,
    },
    {
      category: "Other",
      cost: 10.0,
    },
  ],
  topCategory: {
    category: "Travel",
    cost: 200.0,
  },
  costsPerMonth: [
    {
      cost: 50.25,
      month: 2,
    },
    {
      cost: 30.0,
      month: 3,
    },
    {
      cost: 20.5,
      month: 4,
    },
    {
      cost: 80.0,
      month: 5,
    },
    {
      cost: 15.99,
      month: 6,
    },
    {
      cost: 45.5,
      month: 7,
    },
    {
      cost: 200.0,
      month: 8,
    },
    {
      cost: 10.0,
      month: 9,
    },
  ],
  previousCostsPerMonth: [],
};
