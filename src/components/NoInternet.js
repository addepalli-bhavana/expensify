import React from "react";
import { IoMdRefresh } from "react-icons/io";
import noInternet from "../assets/no-internet.png";

const NoInternet = () => {
  const handleRetry = () => {
    window.location.reload();
  };
 
  return (
    <main className="no-internet section-center section">
      <img src={noInternet} alt="no internet" />
      <h2>oops! no internet connection</h2>
      <p>
        It seems like you're offline. Please check your connection and try
        again.
      </p>
      <button type="button" className="btn retry-btn" onClick={handleRetry}>
        retry
        <IoMdRefresh />
      </button>
    </main>
  );
};

export default NoInternet;
