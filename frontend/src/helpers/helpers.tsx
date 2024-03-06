import { ClassValue, clsx } from "clsx";
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export const monthNames = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};
export const compareDates = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
export const dateToMonthName = (date: Date) => {
  return monthNames[date.getMonth()];
};
export const monthIndexToName = (index: number) => {
  return monthNames[index];
};
export const generateDaysArray = (startDate: Date, endDate: Date): Date[] => {
  return Array.from(
    {
      length: differenceInDays(endDate, startDate) + 1,
    },
    (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return date;
    }
  );
};
