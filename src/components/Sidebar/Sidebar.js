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
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCategory, useVideos } from "../../contexts";
import { useToast } from "../../hooks";
import "./Sidebar.css";

export const Sidebar = () => {
  const {sidebars, handleToggleSidebar}=useCategory();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    // localStorage.removeItem("login");
    // localStorage.removeItem("user");
    // localStorage.removeItem("signup");
    localStorage.clear();
    navigate(0);
    showToast("Logged Out!", "success");
  };
  
  return (
    <aside
      className={`${sidebars ? "sidebar open" : "sidebar"}`}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/">
        <li>
          <MdHome size={25} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/">
        <li>
          <MdOutlineExplore size={25} />
          <span>Explore</span>
        </li>
      </Link>
      <Link to="/playlists">
        <li>
          <MdPlaylistAdd size={25} />
          <span>Playlists</span>
        </li>
      </Link>
      <Link to="/watch-later">
        <li>
          <MdOutlineWatchLater size={25} />
          <span>Watch Later{" "}</span>
        </li>
      </Link>
      <Link to="/liked-videos">
        <li>
          <MdThumbUp size={25} />
          <span>Liked Videos{" "}</span>
        </li>
      </Link>
      <Link to="/history">
        <li>
          <MdHistory size={25} />
          <span>History</span>
        </li>
      </Link>
      <hr />

      <li onClick={logoutHandler}>
        <MdExitToApp size={25} />
        <span>Log Out</span>
      </li>

      <hr />
    </aside>
  );
};
