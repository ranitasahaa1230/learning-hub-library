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
      <NavLink to="/" className="navlink">
        <li>
          <MdHome size={25} />
          <span>Home</span>
        </li>
      </NavLink>

      <NavLink to="/explore" className="navlink">
        <li>
          <MdOutlineExplore size={25} />
          <span>Explore</span>
        </li>
      </NavLink>
      <NavLink to="/playlists" className="navlink">
        <li>
          <MdPlaylistAdd size={25} />
          <span>Playlists</span>
        </li>
      </NavLink>
      <NavLink to="/watch-later" className="navlink">
        <li>
          <MdOutlineWatchLater size={25} />
          <span>Watch Later </span>
        </li>
      </NavLink>
      <NavLink to="/liked-videos" className="navlink">
        <li>
          <MdThumbUp size={25} />
          <span>Liked Videos </span>
        </li>
      </NavLink>
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
