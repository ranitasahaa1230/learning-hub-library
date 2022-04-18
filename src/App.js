import "./App.css";
import { useState } from "react";
import {
  Footer,
  Header,
  Loader,
  NotFound,
  RequireAuth,
  Toast,
} from "./components";
import { Route, Routes } from "react-router-dom";
import {
  History,
  Home,
  LikedVideo,
  Login,
  Playlist,
  SignUp,
  WatchLater,
} from "./pages";
import Mockman from "mockman-js";
import { useTheme } from "./contexts";

function App() {
  const [sidebars, toggleSidebar] = useState(false);
  const { theme } = useTheme();

  const handleToggleSidebar = () => toggleSidebar((prev) => !prev);

  return (
    <div className={theme ? "light__mode" : "dark__mode"}>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <Toast />
      {/* <Loader /> */}
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/watch/:id" element={<SingleVideoPage />} /> */}

        <Route
          path="/playlists"
          element={
            <RequireAuth>
              <Playlist />
            </RequireAuth>
          }
        />
        <Route
          path="/watch-later"
          element={
            <RequireAuth>
              <WatchLater />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <RequireAuth>
              <LikedVideo />
            </RequireAuth>
          }
        />
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
