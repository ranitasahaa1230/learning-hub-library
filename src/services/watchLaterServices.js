import axios from "axios";
import { ADD_WATCH_LATER_VIDEOS, UPDATE_WATCH_LATER_VIDEOS } from "../reducers";

const addToWatchLater = async (video, videoDispatch, showToast) => {
  try {
    const {
      data: { watchlater },
    } = await axios.post(
      `/api/user/watchlater`,
      { video },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    videoDispatch({ type: UPDATE_WATCH_LATER_VIDEOS, payload: watchlater });
    showToast("Video added in watch later videos", "success");
  } catch (error) {
    showToast("Could not add in watch later videos", "error");
  }
};

const removeFromWatchLater = async (videoId, videoDispatch, showToast) => {
    try {
      const {
        data: { watchlater },
      } = await axios.delete(
        `/api/user/watchlater/${videoId}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
  
      videoDispatch({ type: UPDATE_WATCH_LATER_VIDEOS, payload: watchlater });
      showToast("Video removed from watch later videos", "success");
    } catch (error) {
      showToast("Could not remove the video", "error");
    }
  };

  export {addToWatchLater,removeFromWatchLater}