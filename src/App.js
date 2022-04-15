import "./App.css";
import { useState } from "react";
import { Footer, Header, NotFound } from "./components";
import { Route, Routes } from "react-router-dom";
import { History, Home, LikedVideo, Playlist, WatchLater } from "./pages";
import Mockman from "mockman-js";
import { useTheme } from "./contexts";

function App() {
  const [sidebars, toggleSidebar] = useState(false);
  const {theme}=useTheme();

  const handleToggleSidebar = () => toggleSidebar((prev) => !prev);

  return (
    <div className={theme ? "light__mode" : "dark__mode"}>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebars={sidebars}
              handleToggleSidebar={handleToggleSidebar}
            />
          }
        />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/playlists" element={<Playlist/>}/>
        <Route path="/watch-later" element={<WatchLater/>}/>
        <Route path="/liked-videos" element={<LikedVideo/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <button
        className="button button-floating"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {" "}
        <i className="fas fa-arrow-up"></i>
      </button>
      <Footer />
    </div>
  );
}

export default App;
