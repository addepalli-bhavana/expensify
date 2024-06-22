import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLightTheme: true,
    expenses: [],
  },
  reducers: {
    initializeProfile: (state, action) => {
      return { ...state, ...action.payload };
    },

    addExpense: (state, action) => {
      const { id, description, amount, category } = action.payload;
      const newExpense = { id, description, amount, category };
      const updatedState = {
        ...state,
        expenses: [...state.expenses, newExpense],
      };
      return updatedState;
    },

    editExpense: (state, action) => {
      const { id, amount, description, category } = action.payload;
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === Number(id)
          ? { ...expense, amount, description, category }
          : expense
      );
      const updatedState = { ...state, expenses: updatedExpenses };
      return updatedState;
    },

    deleteExpense: (state, action) => {
      const { id } = action.payload;
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== id
      );
      const updatedState = { ...state, expenses: updatedExpenses };
      return updatedState;
    },

    clearExpenses: (state) => {
      return { ...state, expenses: [] };
    },

    toggleTheme: (state) => {
      const updatedState = { ...state, isLightTheme: !state.isLightTheme };
      return updatedState;
    },
  },
});
export const {
  initializeProfile,
  toggleTheme,
  addExpense,
  editExpense,
  deleteExpense,
  clearExpenses,
} = profileSlice.actions;

export default profileSlice.reducer;
