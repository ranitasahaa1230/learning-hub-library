import axios from "axios";
import React, { useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle, useToast } from "../../hooks";
import { signupReducer } from "../../reducers";
import "./Auth.css";
// import { validFormChecker } from "./utils";

export function SignUp() {
  useDocumentTitle("SignUp");

  const { dispatch: authDispatch } = useAuth();

  const [state, dispatch] = useReducer(signupReducer, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = state;

  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      const { createdUser: user, encodedToken } = response.data;
      authDispatch({ type: "AUTH_SUCCESS", payload: { user, encodedToken } });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", encodedToken);
      if (location.state !== null) {
        navigate(location.state?.from?.pathname);
      } else {
        navigate("/");
      }
      showToast("Account Created and Logged In!", "success");
    } catch (error) {
      showToast(error.response.data.errors[0], "error");
    }
  };

  const registerHandler = () => {
    if (password !== confirmPassword) setError("Passwords do not match");
  };

  return (
    <div className="app__container">
      <Sidebar />
      <div className="form-box">
        <div className="button-box">
          <h3 className="toggle-btn">SIGN UP</h3>
        </div>
        <form className="input-group" onSubmit={handleFormSubmit}>
          <label htmlFor="firstname" className="password-label">
            First Name
          </label>
          <input
            type="text"
            className="input-fields"
            placeholder="First Name"
            value={firstName}
            onChange={(e) =>
              dispatch({ type: "FIRST_NAME", payload: e.target.value })
            }
            required
          />
          <label htmlFor="lastname" className="password-label">
            Last Name
          </label>
          <input
            type="text"
            className="input-fields"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              dispatch({ type: "LAST_NAME", payload: e.target.value })
            }
            required
          />
          <label htmlFor="mail" className="password-label">
            Email Address
          </label>
          <input
            type="email"
            className="input-fields"
            placeholder="Enter Email Id"
            value={email}
            onChange={(e) =>
              dispatch({ type: "EMAIL", payload: e.target.value })
            }
            required
          />
          <label htmlFor="pwd" className="password-label">
            Password
          </label>
          <div className="visibility">
            <input
              type={showPassword ? "text" : "password"}
              className="visibility-fields"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                dispatch({ type: "PASSWORD", payload: e.target.value })
              }
              autoComplete="off"
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

          <label htmlFor="pwd" className="password-label">
            Confirm Password
          </label>
          <div className="visibility">
            <input
              type={showPassword ? "text" : "password"}
              className="visibility-fields"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              autoComplete="off"
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

          <div className="checkbox-block">
            <input type="checkbox" className="check-box" />
            <span className="check-psswd">
              I agree to all terms and conditions
            </span>
          </div>
          <button
            type="submit"
            className="submit-loginbtns"
            onClick={registerHandler}
          >
            REGISTER
          </button>

          {error && (
            <div className="login-error-msg">
              <i className="fa-solid fa-square-xmark"></i>
              <p>{error}</p>
            </div>
          )}

          <div className="input-account">
            Already registered?
            <Link to="/login" className="primary-account">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
