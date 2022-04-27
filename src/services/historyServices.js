import axios from "axios";
import { CLEAR_ALL_HISTORY, REMOVE_FROM_HISTORY } from "../reducers";

const clearAllHistory = async (playListDispatch, navigate, showToast) => {
  try {
    const {
      data: { history },
    } = await axios.delete(
      `/api/user/history/all`,
      { headers: { authorization: localStorage.getItem("token") } }
    );
    navigate("/");
    playListDispatch({ type: CLEAR_ALL_HISTORY, payload: history });
    showToast("History cleared successfully", "success");
  } catch (error) {
    showToast("Could not clear the history","error");
  }
};

const removeFromHistory = async (videoId, playListDispatch, showToast) => {
  try { 
    await axios.delete(
      `/api/user/history/${videoId}`,
      { headers: { authorization: localStorage.getItem("token") } }
    );
    playListDispatch({ type: REMOVE_FROM_HISTORY, payload: videoId });
    showToast("Video removed from history", "success");
  } catch (error) {
    showToast("Could not remove the video", "error");
  }
};

export {clearAllHistory, removeFromHistory};