import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseData } from "../models/expenses/ExpenseData";
import { DemoExpenses } from "../demo-data/DemoExpenses";
import { DemoPlannedExpenses } from "../demo-data/DemoPlannedExpenses";

export interface RootState {
  savedExpenses: ExpenseData[];
  savedPlannedExpenses: ExpenseData[];
}

const initialState: RootState = {
  savedExpenses: DemoExpenses,
  savedPlannedExpenses: DemoPlannedExpenses,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseData>) => {
      state.savedExpenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<ExpenseData>) => {
      const index = state.savedExpenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.savedExpenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.savedExpenses = state.savedExpenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expensesSlice.actions;

const store = configureStore({
  reducer: expensesSlice.reducer,
});

export default store;
