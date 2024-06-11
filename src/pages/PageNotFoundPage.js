import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import pageNotFound from "../assets/page-not-found.png";

const PageNotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="page-not-found section-center section">
      <img src={pageNotFound} alt="404 error" />
      <h2>oops! page not found</h2>
      <p>
        The page you're looking for may have been relocated, renamed, or is
        momentarily unavailable. Kindly verify the URL and attempt again.
      </p>
      <Link to="/" className="btn page-not-found-btn">
        <GrFormPreviousLink /> back to home
      </Link>
    </main>
  );
};

export default PageNotFoundPage;
