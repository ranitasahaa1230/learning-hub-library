import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts";

export const Header = ({ handleToggleSidebar }) => {
  const { theme, changeTheme } = useTheme();
  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={22}
        onClick={() => handleToggleSidebar()}
      />

      <div className="flex__hub">
      <Link to="/"><img src={logo} alt="logo" className="header__logo" /></Link> 
        <Link to="/" className="header__name">
          Learning Hub
        </Link>
      </div>

      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="mode__icons" onClick={()=>changeTheme()}>
      {theme ? <i className="fa-solid fa-moon"></i>
         : <i className="fa-solid fa-sun"></i>}
        </div>

      <div className="header__icons">
        <i className="fa-solid fa-user"></i>
        <span className="font__icons">LOGIN</span>
      </div>
    </div>
  );
};
