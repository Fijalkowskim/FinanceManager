import React, { ReactNode, createContext, useContext, useState } from "react";
import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";
import { analyticsRanges, last7days } from "../data/AnalyticsRanges";
import api from "../api/api";
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
          setRange({ filterText: rangeText, apiParam: `/years/${year}` });
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
  return (
    <AnalyticsContext.Provider
      value={{
        category,
        setCategory,
        range,
        setRange,
        setRangeByString,
        getYearsWithExpenses,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
