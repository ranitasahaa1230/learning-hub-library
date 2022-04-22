import "./App.css";
import { Footer, Header, NotFound, RequireAuth, Toast } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  History,
  Home,
  LikedVideo,
  Login,
  Playlist,
  SignUp,
  WatchLater,
  SingleVideoPage,
} from "./pages";
import Mockman from "mockman-js";
import { useTheme } from "./contexts";

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme ? "light__mode" : "dark__mode"}>
      <Header />
      <Toast />
      {/* <Loader /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/video/:videoId" element={<SingleVideoPage />} />
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
