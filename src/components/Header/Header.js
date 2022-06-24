import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link} from "react-router-dom";
import { useAuth, useCategory, useTheme, useVideos } from "../../contexts";
import { videosActions } from "../../reducers/actionTypes";

export const Header = () => {
  const { theme, changeTheme } = useTheme();
  const { handleToggleSidebar } = useCategory();
  const { pathname } = useLocation();
  const {
    state: { isAuth, user },
  } = useAuth();
  const {
    videoDispatch,
  } = useVideos();
  const { FILTER_BY_SEARCH } = videosActions;

  return (
    <div className="header">
      <FaBars
        className="header__menu"
        size={22}
        onClick={() => handleToggleSidebar()}
      />

      <div className="flex__hub">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <Link to="/" className="header__name">
          Learning Hub
        </Link>
      </div>

      {pathname ==="/" && <form>
        <input type="text" placeholder="Search for your Favorite Videos..." 
        onChange={(e) =>videoDispatch({ type: FILTER_BY_SEARCH, payload: e.target.value })}/>
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>}

      <div className="form-right">
      <div className="mode__icons" onClick={changeTheme}>
        {theme ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </div>

      {!isAuth && <Link to="/signup">
        <button className="header__signup">SIGN UP</button>
      </Link>}

      {isAuth ? (
        <Link to="/userProfile" className="header__icons">
          <span className="header__user">
            {user?.firstName}
            <FaAngleRight size={22} />
          </span>
          <button className="header__logout">
            View Profile
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <div className="header__icons">
            <i className="fa-solid fa-user"></i>
            <span className="font__icons">LOGIN</span>
          </div>
        </Link>
      )}
      </div>

    </div>
  );
};
