import React from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";
import "./NotFound.css";
import error from "../../assets/error.jpg";

export const NotFound = () => {
  useDocumentTitle("Not Found Page");
  return (
    <div className="not__found">
      <img src={error} alt="error" />
      Oops!! You have entered a wrong URL.😕{"  "}
      <Link to="/" className="span__not">
        {" "}
        Go Back!
      </Link>
    </div>
  );
};
