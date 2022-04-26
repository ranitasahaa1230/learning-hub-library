import axios from "axios";
import {
  SET_PLAYLIST,
  ADD_TO_PLAYLIST,
  DELETE_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
} from "../reducers";

const createToPlaylist = async (
  event,
  playListName,
  playListModalDispatch,
  playListDispatch
) => {
  event.preventDefault();
  try {
    playListModalDispatch({ type: "LOADING", payload: true });
    const {
      data: { playlists },
    } = await axios.post(
      `/api/user/playlists`,
      {
        playlist: { title: playListName },
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    playListDispatch({ type: SET_PLAYLIST, payload: playlists });
    playListModalDispatch({ type: RESET });
  } catch (error) {
    console.log(error);
  }
};

const addToPlaylist = async (
  video,
  playlistId,
  playListDispatch,
  showToast
) => {
  try {
    await axios.post(
      `/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    playListDispatch({ type: ADD_TO_PLAYLIST, payload: { video, playlistId } });
    showToast("Video added in Playlist", "success");
  } catch (error) {
    showToast("Could not add the video in playlist", "error");
  }
};

const deletePlaylist = async (
  playlistId,
  playListDispatch,
  navigate,
  showToast
) => {
  try {
    await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    navigate("/playlists");
    playListDispatch({ type: DELETE_PLAYLIST, payload: playlistId });
    showToast("Playlist deleted successfully", "success");
  } catch (error) {
    showToast("Something went wrong!", "error");
  }
};

const removeFromPlaylist = async (
  videoId,
  playlistId,
  playListDispatch,
  showToast
) => {
  try {
    await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    playListDispatch({
      type: REMOVE_FROM_PLAYLIST,
      payload: { videoId, playlistId },
    });
    showToast("Video removed from the Playlist", "success");
  } catch (error) {
    showToast("Could not remove the video from the Playlist", "error");
  }
};

export { createToPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist };
