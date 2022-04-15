import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../hooks";
import "./Auth.css";

export function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useDocumentTitle("Login");

  //   const { updateUser } = useAuth();
    const handleFormHandler = async (event) => {
      event.preventDefault();
      try {
        const {
          data: { foundUser, encodedToken },
        } = await axios.post("/api/auth/login", loginForm);

        // updateUser(foundUser);
        localStorage.setItem("token", encodedToken);
        navigate("/");
      } catch (error) {
        setError("Email or password is incorrect");
      }
    };

  function loginHandler() {
    setLoginForm({ email: "ranitasaha123@gmail.com", password: "ranitasaha" });
  }
  return (
      <div className="section__login">
        <div className="form-box">
          <div className="button-box">
            <div id="btn"></div>
            <h3 className="toggle-btn">LOGIN</h3>
          </div>
          <form
            className="input-group login"
              onSubmit={handleFormHandler}
          >
            <label className="password-label" htmlFor="mail">
              Email Address
            </label>
            <input
              type="text"
              id="inputbox"
              className="input-fields"
              placeholder="test@gmail.com"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((form) => ({ ...form, email: e.target.value }))
              }
              required
            />
            <label className="password-label">Password</label>
            <div className="visibility">
              <input
                type={showPassword ? "text" : "password"}
                className="visibility-fields"
                placeholder="test1234"
                autoComplete="off"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((form) => ({
                    ...form,
                    password: e.target.value,
                  }))
                }
                required
              />
              {
                <span
                  className="visibility-icon"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              }
            </div>
            <div>
              <div className="checkbox-block">
                <input type="checkbox" className="check-box" />
                <span className="check-psswd">Remember Me</span>
                <Link to="/">
                  <span
                    className="forget-psswd"
                    onClick={() => navigate("/forgetPwd")}
                  >
                    Forgot Your Password?
                  </span>
                </Link>
              </div>
              <button
                type="submit"
                className="submit-loginbtns"
                onClick={() => {
                  loginHandler();
                }}
              >
                Login with Test Credentials
              </button>
              <button type="submit" className="submit-loginbtn">
                Login
              </button>

              {error && (
                <div className="login-error-msg">
                  <i className="fa-solid fa-square-xmark"></i>
                  <p>{error}</p>
                </div>
              )}

              <div className="input-account">
                Not a user yet?
                <Link to="/signup" className="primary-account">
                  Create your account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}
