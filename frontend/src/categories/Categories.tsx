import { CategoryData } from "../models/CategoryData";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { LuUtilityPole } from "react-icons/lu";
import { MdEmojiTransportation } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { BsJoystick } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { CiCircleQuestion } from "react-icons/ci";
export const categories: CategoryData[] = [
  {
    name: "Groceries",
    color: "#ffa51f",
    icon: <MdOutlineLocalGroceryStore />,
  },
  {
    name: "Utilities",
    color: "#36b549",
    icon: <LuUtilityPole />,
  },
  {
    name: "Transportation",
    color: "#1c6feb",
    icon: <MdEmojiTransportation />,
  },
  {
    name: "Healthcare",
    color: "#ed4e4e",
    icon: <GiHealthNormal />,
  },
  {
    name: "Entertainment",
    color: "#55b5ed",
    icon: <BsJoystick />,
  },
  {
    name: "Clothing",
    color: "#6c48c7",
    icon: <GiClothes />,
  },
  {
    name: "Travel",
    color: "#e9ed6b",
    icon: <GrMapLocation />,
  },
  {
    name: "Other",
    color: "#999999",
    icon: <CiCircleQuestion />,
  },
];

export const GetCategoryData = (categoryName: string): CategoryData => {
  const category = categories.find((cat) => cat.name === categoryName);
  return (
    category ?? (categories.find((cat) => cat.name === "Other") as CategoryData)
  );
};
