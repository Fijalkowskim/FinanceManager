import { useState, useEffect } from "react";
import { AnalyticsData } from "../models/analytics/AnalyticsData";
import { useAnalyticsContext } from "../context/AnalyticsContext";

export const useAnalyticsDashboard = () => {
  const [analyticsDashboard, setAnalyticsDashboard] = useState<AnalyticsData>();
  const [isPending, setIsPending] = useState(false);

  const { category, range, LoadAnalytics } = useAnalyticsContext();

  useEffect(() => {
    const LoadAnalyticsDashboard = async () => {
      setIsPending(true);
      try {
        const data = await LoadAnalytics();
        setAnalyticsDashboard(data);
      } catch (err) {
        console.log(err);
      }
      setIsPending(false);
    };
    LoadAnalyticsDashboard();
  }, [setIsPending, LoadAnalytics]);
  return { analyticsDashboard, isPending };
};
