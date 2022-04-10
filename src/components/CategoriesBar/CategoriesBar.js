import React, { useState } from "react";
import "./CategoriesBar.css";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "Redux",
  "React",
];

export const CategoriesBar = () => {
  const [activeEl, setActiveEl] = useState("All");

  const handleClick = (value) => {
    setActiveEl(value);
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeEl === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};
