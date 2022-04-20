import axios from "axios";

const addToLikes = async (video, likeDispatch, showToast) => {
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

    likeDispatch({ type: "UPDATE_LIKE_VIDEOS", payload: likes });
    showToast("success", "Video added in liked videos");
  } catch (error) {
    showToast("error", "Could not add in liked videos");
  }
};

const removeFromLikes = async (videoId, likeDispatch, showToast) => {
    try {
      const {
        data: { likes },
      } = await axios.post(
        `/api/user/likes/${videoId}`,
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
  
      likeDispatch({ type: "UPDATE_LIKE_VIDEOS", payload: likes });
      showToast("success", "Video removed from liked videos");
    } catch (error) {
      showToast("success", "Could not remove the video");
    }
  };

  export {addToLikes,removeFromLikes}