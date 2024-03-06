import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";

export const Demo2023Analytics: AnnualAnalyticsData = {
  dataType: AnalyticsDataType.annual,
  startDate: new Date("2023-01-01T00:00:00"),
  endDate: new Date("2023-12-31T23:59:59"),
  previousStartDate: new Date("2022-01-01T00:00:00"),
  previousEndDate: new Date("2022-12-31T23:59:59"),
  totalCosts: 537.94,
  totalPreviousCosts: 452.24,
  comparedToPreviousCosts: "+18.95%",
  costsPerCategory: [
    { category: "Groceries", cost: 55.5 },
    { category: "Utilities", cost: 35.0 },
    { category: "Transportation", cost: 25.75 },
    { category: "Healthcare", cost: 90.0 },
    { category: "Entertainment", cost: 18.99 },
    { category: "Clothing", cost: 50.2 },
    { category: "Travel", cost: 250.0 },
    { category: "Other", cost: 12.5 },
  ],
  topCategory: { category: "Travel", cost: 250.0 },
  costsPerMonth: [
    { cost: 55.5, month: 1 },
    { cost: 35.0, month: 2 },
    { cost: 25.75, month: 3 },
    { cost: 90.0, month: 4 },
    { cost: 18.99, month: 5 },
    { cost: 50.2, month: 6 },
    { cost: 250.0, month: 8 },
    { cost: 12.5, month: 9 },
  ],
  previousCostsPerMonth: [
    { cost: 50.25, month: 2 },
    { cost: 30.0, month: 3 },
    { cost: 20.5, month: 4 },
    { cost: 80.0, month: 5 },
    { cost: 15.99, month: 6 },
    { cost: 45.5, month: 7 },
    { cost: 200.0, month: 8 },
    { cost: 10.0, month: 9 },
  ],
};
