import React from "react";
import loader from "../../assets/loader.svg";
import "./Loader.css";

export const Loader=()=>{
  return (
    <div className="loader-wrapper flex-center">
      <img src={loader} className="loader" alt="loader-text"/>
    </div>
  );
}