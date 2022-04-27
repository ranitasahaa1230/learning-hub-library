import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle, useToast } from "../../hooks";
import "./Auth.css";

export function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAuth();
  const { showToast } = useToast();
  useDocumentTitle("Login");

  const handleFormHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", loginForm);
      const { foundUser: user, encodedToken } = response.data;
      dispatch({ type: "AUTH_SUCCESS", payload: { user, encodedToken } });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", encodedToken);
      if (location.state !== null) {
        navigate(location.state?.from?.pathname);
      } else {
        navigate("/");
      }
      showToast("Logged In!", "success");
    } catch (error) {
      showToast(error.response.data.errors[0], "error");
      setError("Email or password is incorrect");
    }
  };

  function loginHandler() {
    setLoginForm({ email: "ranitasaha21@gmail.com", password: "ranitasaha" });
  }
  return (
    <div className="app__container">
      <Sidebar />
      <div className="form-box">
        <div className="button-box">
          <div id="btn"></div>
          <h3 className="toggle-btn">LOGIN</h3>
        </div>
        <form className="input-group login" onSubmit={handleFormHandler}>
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
                onClick={() => setShowPassword((showPassword) => !showPassword)}
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
