import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { IoMdDownload } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { toast } from "react-toastify";
import Expense from "./Expense";
import ExpensesChart from "./ExpensesChart";
import { clearExpenses } from "../features/profileSlice";
import { openModal, openOverlay } from "../features/uiSlice";

const Expenses = () => {
  const { expenses } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
    dispatch(openOverlay());
  };
  return (
    <section className="expenses section-center section">
      <div className="expense-controls">
        <article className="expense-control">
          <span>
            <FaPlus />
          </span>
          <button
            type="button"
            onClick={handleOpenModal}
            className="expense-control-btn btn"
          >
            add expense
          </button>
        </article>
        <article className="expense-control">
          <span>
            <IoMdDownload />
          </span>
          <CSVLink data={expenses} filename={"expenses.csv"}>
            <button type="button" className="expense-control-btn btn">
              download expenses
            </button>
          </CSVLink>
        </article>
        <article className="expense-control">
          <span>
            <GrClear />
          </span>
          <button
            type="button"
            onClick={() => {
              dispatch(clearExpenses());
              toast.success("Expenses cleared.");
            }}
            className="expense-control-btn btn"
          >
            clear expenses
          </button>
        </article>
      </div>
      <div className="expenses-list">
        <div className="expense-headings">
          <h5>description</h5>
          <h5>amount</h5>
          <h5>category</h5>
          <h5>actions</h5>
        </div>
        {expenses.map((expense) => {
          return <Expense expense={expense} key={expense.id} />;
        })}
      </div>
      <ExpensesChart />
    </section>
  );
};

export default Expenses;
