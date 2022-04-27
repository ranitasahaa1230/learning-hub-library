import axios from "axios";
import { UPDATE_WATCH_LATER_VIDEOS } from "../reducers";

const addToWatchLater = async (video, playListDispatch, showToast) => {
  try {
    const {
      data: { watchlater },
    } = await axios.post(
      `/api/user/watchlater`,
      { video },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    playListDispatch({ type: UPDATE_WATCH_LATER_VIDEOS, payload: watchlater });
    showToast("Video added in watch later videos", "success");
  } catch (error) {
    showToast("Could not add in watch later videos", "error");
  }
};

const removeFromWatchLater = async (videoId, playListDispatch, showToast) => {
    try {
      const {
        data: { watchlater },
      } = await axios.delete(
        `/api/user/watchlater/${videoId}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
  
      playListDispatch({ type: UPDATE_WATCH_LATER_VIDEOS, payload: watchlater });
      showToast("Video removed from watch later videos", "success");
    } catch (error) {
      showToast("Could not remove the video", "error");
    }
  };

  export {addToWatchLater,removeFromWatchLater}