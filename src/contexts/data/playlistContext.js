import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useToast } from "../../hooks";
import { playListReducer } from "../../reducers";
import { useAuth } from "../auth-context/auth-context";

const PlaylistContext = createContext({ userTheme: "dark" });

const PlayListProvider = ({ children }) => {
  const [playListState, playListDispatch] = useReducer(playListReducer, {
    playLists: [],
    likedVideos: [],
    watchLater: [],
    history: [],
  });

  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const {
            data: { playlists },
          } = await axios.get("/api/user/playlists", {
            headers: { authorization: localStorage.getItem("token") },
          });

          playListDispatch({ type: "SET_PLAYLIST", payload: playlists });
        } catch (error) {
          showToast("Could not fetch the playlists", "error");
        }
      })();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlaylistContext.Provider value={{ playListState, playListDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlayListProvider };
