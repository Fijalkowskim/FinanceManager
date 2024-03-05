import React, { ReactNode, createContext, useContext, useState } from "react";
import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";
import { analyticsRanges, last7days } from "../data/AnalyticsRanges";
import api from "../api/api";
import { AnalyticsData } from "../models/analytics/AnalyticsData";
import { AnalyticsDataType } from "../models/analytics/AnalyticsDataType";
import { AnnualAnalyticsData } from "../models/analytics/AnnualAnalyticsData";
import { DashboardData } from "../models/analytics/DashboardData";
import { DailyAnalyticsData } from "../models/analytics/DailyAnalyticsData";
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
    try {
      const res = await api.get("/analytics/yearsWithExpenses");
      if (res.data) {
        return res.data as number[];
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };
  const LoadAnalytics = async (): Promise<AnalyticsData | undefined> => {
    try {
      const res = await api.get(
        `/analytics/${range.apiParam}?category=${
          category === "All" ? "" : category
        }`
      );
      const data = res.data;
      if (data) {
        const baseAnalyticsData: AnalyticsData = {
          dataType: range.dataType,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          totalCosts: data.totalCosts,
          totalPreviousCosts: data.totalPreviousCosts,
          comparedToPreviousCosts: data.comparedToPreviousCosts,
          costsPerCategory: data.categoriesAnalytics?.costsPerCategory,
          topCategory: data.categoriesAnalytics?.topCategory,
        };
        if (range.dataType === AnalyticsDataType.annual) {
          const annualAnalyticsData: AnnualAnalyticsData = {
            ...baseAnalyticsData,
            costsPerMonth: data.costsPerMonth,
            previousCostsPerMonth: data.previousCostsPerMonth,
          };
          return annualAnalyticsData;
        } else if (range.dataType === AnalyticsDataType.daily) {
          const dailyAnalyticsData: DailyAnalyticsData = {
            ...baseAnalyticsData,
            costsPerDate: data.costsPerDate.map((item: any) => ({
              cost: item.cost,
              date: new Date(item.date),
            })),
            previousCostsPerDate: data.previousCostsPerDate.map(
              (item: any) => ({
                cost: item.cost,
                date: new Date(item.date),
              })
            ),
          };
          return dailyAnalyticsData;
        }
      }
    } catch (err) {
      console.log(err);
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
