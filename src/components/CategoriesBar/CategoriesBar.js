import React, { useState } from "react";
import { useCategory } from "../../contexts";
import "./CategoriesBar.css";

export const CategoriesBar = () => {
  const [activeEl, setActiveEl] = useState("All");
  const {
    categoryState: { categories, loading, error },
  } = useCategory();

  const handleClick = (category) => {
    setActiveEl(category);
  };


  return (
    <span className="categoriesBar">
      {categories.map(({ _id, categoryName}) => {
        return(
        <span key={_id} className={activeEl === categoryName ? "active" : ""}
        onClick={() => handleClick(categoryName)}
        >
          {categoryName}
        </span>
      );
      })}
    </span>
  );
};
