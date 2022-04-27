import React from "react";
import {
  MdOutlineWatchLater,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdOutlineExplore,
  MdHome,
  MdPlaylistAdd,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, useCategory } from "../../contexts";
import { useToast } from "../../hooks";
import "./Sidebar.css";

export const Sidebar = () => {
  const { sidebars, handleToggleSidebar } = useCategory();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    state: { isAuth },
    dispatch,
  } = useAuth();

  const logoutHandler = () => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    showToast("Logged Out!", "success");
  };

  return (
    <aside
      className={`${sidebars ? "sidebar open" : "sidebar"}`}
      onClick={() => handleToggleSidebar(false)}
    >
      <li>
        <NavLink to="/" className="navlink">
          <MdHome size={25} />
          <span>Home</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/explore" className="navlink">
          <MdOutlineExplore size={25} />
          <span>Explore</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/playlists" className="navlink">
          <MdPlaylistAdd size={25} />
          <span>Playlists</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/watch-later" className="navlink">
          <MdOutlineWatchLater size={25} />
          <span>Watch Later </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/liked-videos" className="navlink">
          <MdThumbUp size={25} />
          <span>Liked Videos </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/history" className="navlink">
          <MdHistory size={25} />
          <span>History</span>
        </NavLink>
      </li>
      <hr />

      {isAuth && (
        <>
          <li onClick={logoutHandler}>
            <MdExitToApp size={25} />
            <span>Log Out</span>
          </li>

          <hr />
        </>
      )}
    </aside>
  );
};
