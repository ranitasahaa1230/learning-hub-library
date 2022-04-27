import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { videoReducer } from "../../reducers";
import { videosActions } from "../../reducers/actionTypes";
import { filterVideoList, getSearchedVideos } from "../../utlities";
const { INITIALIZE, SET_VIDEOS, SET_ERROR } = videosActions;

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, {
    loading: false,
    videos: [],
    error: "",
    selectedCategory: "all",
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

  const filteredList = filterVideoList(
    videoState.selectedCategory,
    videoState.videos
  );
  const finalVideoList = getSearchedVideos(
    filteredList,
    videoState.searchQuery
  );

  return (
    <VideoContext.Provider
      value={{ videoState, videoDispatch, finalVideoList }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideos = () => useContext(VideoContext);

export { useVideos, VideoProvider };
