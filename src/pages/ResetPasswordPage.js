import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { CgMail } from "react-icons/cg";
import { MdAppRegistration } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { validateForm } from "../utils/helpers";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validateForm(setErrors, formData, {
        email: true,
        password: false,
        confirmPassword: false,
        description: false,
        amount: false,
        category: false,
      })
    ) {
      setIsLoading(true);
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyADBo5Lr5PlcgnCbyp3gLQQeEo_yjFGExM`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: formData.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }
        toast.info("Password reset link sent to your email.");
        history.replace("/");
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill out all fields correctly");
    }
  };
  return (
    <main className="reset-pwd">
      <form className="form" noValidate>
        <h3>reset password</h3>
        <p>
          enter the email address. we will send you a link to reset your
          password.
        </p>
        <div className={`input-box ${errors.email && "error-input-box"}`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Enter Email"
            autoFocus
          />
          <span>
            <CgMail />
          </span>
        </div>
        {errors.email && <span className="error-msg">{errors.email}</span>}

        <button
          type="submit"
          onClick={handleSubmit}
          className={`btn form-btn ${isLoading && "btn-disabled"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              submit <MdAppRegistration />
            </>
          )}
        </button>

        <p>
          go back to{" "}
          <Link
            to="/"
            className={isLoading && "btn-disabled"}
            disabled={isLoading}
          >
            home
          </Link>
        </p>
      </form>
    </main>
  );
};
export default ResetPasswordPage;
