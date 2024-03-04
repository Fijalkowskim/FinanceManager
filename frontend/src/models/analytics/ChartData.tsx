import { BubbleDataPoint, ChartTypeRegistry, Point } from "chart.js";

export interface ChartData<T extends keyof ChartTypeRegistry = "bar"> {
  labels: string[];
  datasets: {
    label: string;
    data: (number | [number, number] | Point | BubbleDataPoint | null)[];
    backgroundColor: string;
  }[];
}
