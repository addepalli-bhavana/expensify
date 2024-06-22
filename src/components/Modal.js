import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { closeModal, closeOverlay } from "../features/uiSlice";
import { addExpense, editExpense } from "../features/profileSlice";
import { validateForm } from "../utils/helpers";

const Modal = () => {
  const { expenses } = useSelector((state) => state.profile);
  const { expenseToBeEdited: expense } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(closeModal());
    dispatch(closeOverlay());
  };

  const [formData, setFormData] = useState({
    description: expense ? expense.description : "",
    amount: expense ? expense.amount : "",
    category: expense ? expense.category : "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (
      validateForm(setErrors, formData, {
        email: false,
        password: false,
        confirmPassword: false,
        description: true,
        amount: true,
        category: true,
      })
    ) {
      if (expense) {
        dispatch(
          editExpense({
            id: expense.id,
            description: formData.description,
            amount: formData.amount,
            category: formData.category,
          })
        );
        toast.success("Expense updated.");
      } else {
        dispatch(
          addExpense({
            id:
              expenses.length === 0 ? 1 : expenses[expenses.length - 1].id + 1,
            description: formData.description,
            amount: formData.amount,
            category: formData.category,
          })
        );
        toast.success("Expense added.");
      }
      handleCancel();
    } else {
      toast.error("Please fill out all fields correctly");
    }
  };
  return (
    <form className="modal" noValidate>
      <h3>{expense ? "Edit Expense" : "Add Expense"}</h3>
      <div className={`input-box ${errors.name && "error-input-box"}`}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Expense Description"
        />
        <span>
          <RiPencilLine />
        </span>
      </div>
      {errors.description && (
        <span className="error-msg">{errors.description}</span>
      )}

      <div className={`input-box ${errors.amount && "error-input-box"}`}>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter Expense Amount"
        />
        <span>
          <MdOutlineCurrencyRupee />
        </span>
      </div>
      {errors.amount && <span className="error-msg">{errors.amount}</span>}

      <div className={`input-box ${errors.category && "error-input-box"}`}>
        <select
          name="category"
          autoComplete="off"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="health">Health</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
      </div>
      {errors.category && <span className="error-msg">{errors.category}</span>}

      <div className="cancel-and-add-btns">
        <button type="button" className="btn cancel-btn" onClick={handleCancel}>
          cancel
        </button>
        <button
          type="submit"
          onClick={handleAddExpense}
          className="btn add-btn"
        >
          {expense ? "update expense" : "add expense"}
        </button>
      </div>
    </form>
  );
};
export default Modal;
