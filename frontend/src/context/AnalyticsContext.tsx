import React, { ReactNode, createContext, useContext, useState } from "react";
import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";
import { analyticsRanges, last7days } from "../data/AnalyticsRanges";
import api from "../api/api";
import { AnalyticsData } from "../models/analytics/AnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";
import { DashboardData } from "../models/analytics/DashboardData";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
import { useExpensesContext } from "./ExpensesContext";
import { Demo7daysAnalytics } from "../demo-data/Demo7daysAnalytics";
import { Demo2022Analytics } from "../demo-data/Demo2022Analytics";
import { Demo2023Analytics } from "../demo-data/Demo2023Analytics";
import { Demo2024Analytics } from "../demo-data/Demo2024Analytics";
import { Demo90daysAnalytics } from "../demo-data/Demo90daysAnalytics";
import { Demo30daysAnalytics } from "../demo-data/Demo30daysAnalytics";
const AnalyticsContext = createContext({} as AnalyticsContextProps);
export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}

interface AnalyticsContextProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  range: AnalyticsRangeData;
  setRange: React.Dispatch<React.SetStateAction<AnalyticsRangeData>>;
  setRangeByString: (rangeText: string) => void;
  getYearsWithExpenses: () => Promise<number[]>;
  LoadAnalytics: () => Promise<AnalyticsData | undefined>;
}

export function AnalyticsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [category, setCategory] = useState("All");
  const [range, setRange] = useState<AnalyticsRangeData>(last7days);
  const { savedExpenses } = useExpensesContext();

  const setRangeByString = (rangeText: string) => {
    const found = analyticsRanges.find((r) => r.filterText === rangeText);
    if (found) setRange(found);
    else
      try {
        const year = parseInt(rangeText);
        if (year > 0)
          setRange({
            filterText: rangeText,
            apiParam: `year/${year}`,
            comparedToPreviousText: `${year - 1}`,
            dataType: AnalyticsDataType.annual,
          });
      } catch (err) {}
  };
  const getYearsWithExpenses = async (): Promise<number[]> => {
    return [2024, 2023, 2022];
  };
  const LoadAnalytics = async (): Promise<AnalyticsData | undefined> => {
    switch (range.filterText.toLowerCase()) {
      case "last 7 days":
        return Demo7daysAnalytics;
      case "last 30 days":
        return Demo30daysAnalytics;
      case "last 90 days":
        return Demo90daysAnalytics;
      case "2024":
        return Demo2024Analytics;
      case "2023":
        return Demo2023Analytics;
      case "2022":
        return Demo2022Analytics;
    }
    return undefined;
  };
  return (
    <AnalyticsContext.Provider
      value={{
        category,
        setCategory,
        range,
        setRange,
        setRangeByString,
        getYearsWithExpenses,
        LoadAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
