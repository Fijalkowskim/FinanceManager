import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";

export const Demo2024Analytics: AnnualAnalyticsData = {
  dataType: AnalyticsDataType.annual,
  startDate: new Date("2024-01-01T00:00:00"),
  endDate: new Date("2024-12-31T23:59:59"),
  previousStartDate: new Date("2023-01-01T00:00:00"),
  previousEndDate: new Date("2023-12-31T23:59:59"),
  totalCosts: 1026.68,
  totalPreviousCosts: 537.94,
  comparedToPreviousCosts: "+90.85%",
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
  costsPerMonth: [
    {
      cost: 497.24,
      month: 1,
    },
    {
      cost: 448.19,
      month: 2,
    },
    {
      cost: 81.25,
      month: 3,
    },
  ],
  previousCostsPerMonth: [
    {
      cost: 55.5,
      month: 1,
    },
    {
      cost: 35.0,
      month: 2,
    },
    {
      cost: 25.75,
      month: 3,
    },
    {
      cost: 90.0,
      month: 4,
    },
    {
      cost: 18.99,
      month: 5,
    },
    {
      cost: 50.2,
      month: 6,
    },
    {
      cost: 250.0,
      month: 8,
    },
    {
      cost: 12.5,
      month: 9,
    },
  ],
};
