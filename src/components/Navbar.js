import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSunny } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { toggleTheme } from "../features/profileSlice";
import { openSideBar, openOverlay } from "../features/uiSlice";

const Navbar = () => {
  const isLightTheme = useSelector((state) => state.profile.isLightTheme);
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleOpenSidebar = () => {
    dispatch(openSideBar());
    dispatch(openOverlay());
  };

  return (
    <nav>
      <div className="nav-center">
        <Link to="/">
          <img src={logo} className="logo" alt="expensify logo" />
        </Link>
        <div className="theme-and-user-icons">
          <button type="button" className="theme-icon" onClick={handleTheme}>
            {isLightTheme ? <IoIosSunny /> : <IoMoonSharp />}
          </button>
          <button
            type="button"
            className="user-icon"
            onClick={handleOpenSidebar}
          >
            <FaUserCircle />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
