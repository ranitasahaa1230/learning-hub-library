import axios from "axios";
import { UPDATE_LIKE_VIDEOS } from "../reducers";

const addToLikes = async (video, videoDispatch, showToast) => {
  try {
    const {
      data: { likes },
    } = await axios.post(
      `/api/user/likes`,
      { video },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );

    videoDispatch({ type: UPDATE_LIKE_VIDEOS, payload: likes });
    showToast("Video added in liked videos", "success");
  } catch (error) {
    showToast("Could not add in liked videos", "error");
  }
};

const removeFromLikes = async (videoId, videoDispatch, showToast) => {
    try {
      const {
        data: { likes },
      } = await axios.delete(
        `/api/user/likes/${videoId}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
  
      videoDispatch({ type: UPDATE_LIKE_VIDEOS, payload: likes });
      showToast("Video removed from liked videos", "success");
    } catch (error) {
      showToast("Could not remove the video", "error");
    }
  };

  export {addToLikes,removeFromLikes}