import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import Modal from "./components/Modal";
import { closeModal, closeOverlay, closeSideBar } from "./features/uiSlice";

import { initializeProfile } from "./features/profileSlice";

const App = () => {
  let { isLoggedIn, email } = useSelector((state) => state.auth);
  const { isOverlayPresent, isModalOpen } = useSelector((state) => state.ui);
  const isLightTheme = useSelector((state) => state.profile.isLightTheme);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLightTheme) {
      document.documentElement.classList.remove("dark-theme");
    } else {
      document.documentElement.classList.add("dark-theme");
    }
  }, [isLightTheme]);

  const handleClickOnOverlay = () => {
    dispatch(closeModal());
    dispatch(closeOverlay());
    dispatch(closeSideBar());
  };

  useEffect(() => {
    if (email) {
      const profileData = JSON.parse(localStorage.getItem(email));

      if (profileData) {
        dispatch(initializeProfile(profileData));
      } else {
        dispatch(
          initializeProfile({
            isLightTheme: true,
            expenses: [],
          })
        );
      }
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      localStorage.setItem(email, JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      {isLoggedIn && <Sidebar />}
      {isOverlayPresent && (
        <div className="overlay" onClick={handleClickOnOverlay}></div>
      )}
      {isModalOpen && <Modal />}
      <Switch>
        <Route exact path="/register">
          {isLoggedIn ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/">
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/reset-password">
          {isLoggedIn ? <ResetPasswordPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <PageNotFoundPage />
        </Route>
      </Switch>
      {isLoggedIn && <Footer />}
    </BrowserRouter>
  );
};

export default App;
