import React, { ReactNode, createContext, useContext, useState } from "react";
import { AnalyticsRangeData } from "../models/analytics/AnalyticsRangeData";
import { analyticsRanges, last7days } from "../data/AnalyticsRanges";
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
  };

  return (
    <AnalyticsContext.Provider
      value={{ category, setCategory, range, setRange, setRangeByString }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
