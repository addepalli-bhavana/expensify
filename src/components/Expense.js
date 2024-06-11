import React from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { deleteExpense } from "../features/profileSlice";
import { openModal, openOverlay } from "../features/uiSlice";
import { formatAmount } from "../utils/helpers";

const Expense = ({ expense }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteExpense({ id }));
    toast.success("Expense deleted");
  };

  const handleEdit = (expense) => {
    dispatch(openModal(expense));
    dispatch(openOverlay());
  };

  return (
    <article className="expense">
      <span>{expense.description}</span>
      <span>{formatAmount(expense.amount)}</span>
      <span>{expense.category}</span>
      <div className="expense-btns">
        <button
          type="button"
          className="expense-btn"
          onClick={() => handleDelete(expense.id)}
        >
          <AiFillDelete />
        </button>
        <button
          type="button"
          className="expense-btn"
          onClick={() => {
            handleEdit(expense);
          }}
        >
          <BiSolidEdit />
        </button>
      </div>
    </article>
  );
};

export default Expense;
