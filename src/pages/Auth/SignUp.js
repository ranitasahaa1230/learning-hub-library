import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../hooks";
import "./Auth.css";
// import { validFormChecker } from "./utils";

export function SignUp() {
  useDocumentTitle("SignUp");

  const signUpFields = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

//   const [signUpForm, setSignUpForm] = useState(signUpFields);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const [formErrors, setFormErrors] = useState({});

//   const { updateUser } = useAuth();
  // const { setLoader } = useData();
  const navigate = useNavigate();

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const isValidForm = validFormChecker(signUpForm);
//     if (isValidForm) {
//       try {
//         const {
//           data: { createdUser, encodedToken },
//         } = await axios.post("/api/auth/signup", signUpForm);
//         updateUser(createdUser);
//         localStorage.setItem("token", encodedToken);
//         navigate("/");
//       } catch (error) {
//         setError("Something is wrong, please try later.");
//       }
//     }
//   };

  return (
    <div className="section__login">
    <div className="form-box">
        <div className="button-box">
          <h3 className="toggle-btn">SIGN UP</h3>
        </div>
        <form className="input-group" 
        // onSubmit={handleFormSubmit}
        >
          <label htmlFor="firstname" className="password-label">
            First Name
          </label>
          <input
            type="text"
            className="input-fields"
            placeholder="First Name"
            // value={signUpForm.firstName}
            // onChange={(e) => fillFormValue(e, "firstName")}
            required
          />
          <label htmlFor="lastname" className="password-label">
            Last Name
          </label>
          <input
            type="text"
            className="input-fields"
            placeholder="Last Name"
            // value={signUpForm.lastName}
            // onChange={(e) => fillFormValue(e, "lastName")}
            required
          />
          <label htmlFor="mail" className="password-label">
            Email Address
          </label>
          <input
            type="email"
            className="input-fields"
            placeholder="Enter Email Id"
            // value={signUpForm.email}
            // onChange={(e) => fillFormValue(e, "email")}
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
            // value={signUpForm.password}
            autoComplete="off"
            // onChange={(e) => fillFormValue(e, "password")}
            required
          />
           {
            <span
              className="visibility-icon"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
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