import { ExpenseData } from "../models/expenses/ExpenseData";
export const GetNewPlannedExpenseId = (): number => {
  const maxId = Math.max(
    ...DemoPlannedExpenses.map((expense) => expense.id),
    0
  );
  return maxId + 1;
};
export const DemoPlannedExpenses: ExpenseData[] = [
  {
    id: 0,
    cost: 40.5,
    category: "Groceries",
    description: "Grocery shopping",
    date: new Date("2024-03-05"),
  },
  {
    id: 1,
    cost: 25.0,
    category: "Utilities",
    description: "Electricity bill",
    date: new Date("2024-04-10"),
  },
  {
    id: 2,
    cost: 30.0,
    category: "Transportation",
    description: "Public transportation pass",
    date: new Date("2024-05-01"),
  },
  {
    id: 3,
    cost: 15.0,
    category: "Healthcare",
    description: "Prescription medication",
    date: new Date("2024-03-05"),
  },
  {
    id: 4,
    cost: 50.0,
    category: "Entertainment",
    description: "Movie night",
    date: new Date("2024-01-28"),
  },
  {
    id: 5,
    cost: 45.0,
    category: "Clothing",
    description: "Winter jacket",
    date: new Date("2024-03-07"),
  },
];
