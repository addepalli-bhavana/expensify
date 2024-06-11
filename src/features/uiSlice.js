import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSideBarOpen: false,
    isOverlayPresent: false,
    isModalOpen: false,
    expenseToBeEdited:null
  },
  reducers: {
    openSideBar(state) {
      return { ...state, isSideBarOpen: true };
    },
    closeSideBar(state) {
      return { ...state, isSideBarOpen: false };
    },
    openOverlay(state) {
      return { ...state, isOverlayPresent: true };
    },
    closeOverlay(state) {
      return { ...state, isOverlayPresent: false };
    },
    openModal(state,action) {
      return { ...state, isModalOpen: true,expenseToBeEdited:action.payload };
    },
    closeModal(state) {
      return { ...state, isModalOpen: false };
    },
  },
});
export const {
  openSideBar,
  closeSideBar,
  openOverlay,
  closeOverlay,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
