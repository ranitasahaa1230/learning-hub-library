import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useRef} from "react";
import { videoReducer } from "../../reducers";
import { videosActions } from "../../reducers/actionTypes";
import { getPageVideoServices } from "../../services";
import { filterVideoList, getSearchedVideos } from "../../utlities";
const { INITIALIZE, SET_VIDEOS, SET_ERROR, SET_TOTAL_PAGES} = videosActions;


const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, {
    loading: false,
    videos: [],
    error: "",
    selectedCategory: "all",
    searchQuery: "",
    pageNum: 0,
    lastVideo: null,
    totalPages: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        videoDispatch({ type: INITIALIZE });
        const res = await axios.get("/api/videos");
        if (res.status === 200) {
          // videoDispatch({ type: SET_VIDEOS, payload: res.data.videos });
          videoDispatch({
            type: SET_TOTAL_PAGES,
            payload: Math.ceil(res.data.videos.length / 8) ,
        });
        }
      } catch (err) {
        videoDispatch({ type: SET_ERROR, payload: err.message });
      }
    })();
  }, []);

  useEffect(() => {
    if (videoState.pageNum < videoState.totalPages) {
        (async function () {
            try {
                videoDispatch({ type: INITIALIZE });
                const res= await getPageVideoServices(videoState.pageNum);
                if (res.status === 200) {
                    videoDispatch({ type: SET_VIDEOS, payload: res.data.videos});
                }
            } catch (err) {
                videoDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
            }
        })();
    }
}, [videoState.pageNum, videoState.totalPages]);

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
