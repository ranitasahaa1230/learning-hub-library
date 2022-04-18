import React from "react";
import loader from "../../assets/loader.gif";
import "./Loader.css";

export const Loader=()=>{
  return (
    <div className="loader-wrapper flex-center">
      <img src={loader} className="loader"></img>
    </div>
  );
}