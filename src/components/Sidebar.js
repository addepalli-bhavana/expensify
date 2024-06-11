import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import { logoutUser } from "../features/authSlice";
import { closeOverlay, closeSideBar } from "../features/uiSlice";
import { sidebarLinks } from "../utils/constants";

const Sidebar = () => {
  const isSideBarOpen = useSelector((state) => state.ui.isSideBarOpen);
  const { name, photo } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCloseSideBar = () => {
    dispatch(closeOverlay());
    dispatch(closeSideBar());
  };

  const handleLogout = () => {
    handleCloseSideBar();
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    toast.success("Logged out successfully!");
    history.replace("/login");
  };

  return (
    <aside className={`sidebar ${isSideBarOpen && "show-sidebar"}`}>
      <div className="sidebar-header">
        <Link to="/">
          <img src={logo} className="logo" alt="expensify logo" />
        </Link>
        <button type="button" onClick={handleCloseSideBar}>
          <FaTimes />
        </button>
      </div>

      <div className="user-info">
        {photo ? <img src={photo} className="photo-small" /> : <FaUserCircle />}
        <h5>hii {name ? name : "dear"}</h5>
      </div>

      <ul className="sidebar-links">
        {sidebarLinks.map((link) => {
          const { id, label, url } = link;
          return (
            <li key={id}>
              <Link to={url} onClick={handleCloseSideBar}>
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <button type="button" onClick={handleLogout} className="auth-btn">
            logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
