import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { videoReducer } from "../../reducers";
import { videosActions } from "../../reducers/actionTypes";
const { INITIALIZE, SET_VIDEOS, SET_ERROR } = videosActions;

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, {
    loading: false,
    videos: [],
    error: "",
    selectedCategory: "All",
    searchQuery: "",
  });

  useEffect(() => {
    (async () => {
      try {
        videoDispatch({ type: INITIALIZE });
        const res = await axios.get("/api/videos");
        if (res.status === 200) {
          videoDispatch({ type: SET_VIDEOS, payload: res.data.videos });
        }
      } catch (err) {
        videoDispatch({ type: SET_ERROR, payload: err.message });
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};
const useVideos = () => useContext(VideoContext);

export { useVideos, VideoProvider };
