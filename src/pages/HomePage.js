import React from "react";
import { useSelector } from "react-redux";
import Expenses from "../components/Expenses";
import NoExpenses from "../components/NoExpenses";

const HomePage = () => {
  const { expenses } = useSelector((state) => state.profile);
  return <main>{expenses.length > 0 ? <Expenses /> : <NoExpenses />}</main>;
};

export default HomePage;
