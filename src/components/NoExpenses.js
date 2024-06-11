import React from "react";
import { useDispatch } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";

import { openModal, openOverlay } from "../features/uiSlice";
const NoExpenses = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
    dispatch(openOverlay());
  };
  return (
    <section className="no-expenses">
      <div className="section-center no-expenses-center">
        <h1>woohoo! no expenses in sight!</h1>
        <button
          type="button"
          className="add-expense-btn"
          onClick={handleOpenModal}
        >
          add expense <IoMdAddCircle />
        </button>
      </div>
    </section>
  );
};

export default NoExpenses;
