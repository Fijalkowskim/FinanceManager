import { CategoryData } from "../models/CategoryData";

const categories: CategoryData[] = [
  {
    name: "Groceries",
    color: "#ffa51f",
  },
  {
    name: "Utilities",
    color: "#36b549",
  },
  {
    name: "Transportation",
    color: "#1c6feb",
  },
  {
    name: "Healthcare",
    color: "#ed4e4e",
  },
  {
    name: "Entertainment",
    color: "#55b5ed",
  },
  {
    name: "Clothing",
    color: "#6c48c7",
  },
  {
    name: "Travel",
    color: "#e9ed6b",
  },
  {
    name: "Other",
    color: "#999999",
  },
];

export const GetCategoryData = (categoryName: string): CategoryData => {
  const category = categories.find((cat) => cat.name === categoryName);
  return category ?? { name: "Other", color: "#2b2b2b" };
};
