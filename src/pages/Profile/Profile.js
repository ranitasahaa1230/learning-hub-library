import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle, useToast } from "../../hooks";
import "./Profile.css";

export const Profile = () => {
  useDocumentTitle("User Prodile Page");
  const {
    state: { user },dispatch,
  } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({type:"LOG_OUT"});
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    showToast("Logged Out!", "success");
  };

  return (
    <div className="app__container">
      <Sidebar />
      <div className="profile__details">
        <div className="details">Account Details</div>
        <div className="box__page">
          <div className="profile__account">Your Profile</div>
          <div className="label__block">
            <label className="label__block__details">
              Full Name :{" "}
              <span className="account__profile">
                {user?.firstName} {user?.lastName}
              </span>
            </label>
          </div>
          <div className="label__block">
            <label className="label__block__details">
              Email Address :{" "}
              <span className="account__profile">{user?.email}</span>
            </label>
          </div>
          <div className="profile__account">Account Settings</div>
          <button className="logout__btn" onClick={logoutHandler}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};
