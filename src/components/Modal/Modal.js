import React, { useReducer, useState } from "react";
import { usePlaylist } from "../../contexts";
import { useToast } from "../../hooks";
import { playListModalReducer } from "../../reducers";
import { addToPlaylist, createToPlaylist, removeFromPlaylist } from "../../services";
import { isInPlaylistVideo } from "../../utlities";
import "./Modal.css";

export const Modal = ({video, modalIcon}) => {
  const { showToast } = useToast();
  const {
    playListState: { playLists },
    playListDispatch,
  } = usePlaylist();

  const [{ loading, showInput, playListName }, playListModalDispatch] =
    useReducer(playListModalReducer, {
      loading: false,
      showInput: false,
      playListName: "",
    });


    const handleInputChange = (event) => {
      playListModalDispatch({
        type: "SET_NEW_PLAYLIST_NAME",
        payload: event.target.value,
      });
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      createToPlaylist(
        event,
        playListName,
        playListModalDispatch,
        playListDispatch
      );
    };

    
  const handlePlaylistInputChange = (event, playlistId) => {
    if (event.target.checked) {
      addToPlaylist(video, playlistId, playListDispatch, showToast);
    } else {
      removeFromPlaylist(video._id, playlistId, playListDispatch, showToast);
    }
  };

  return (
    <div className="modal__properties">
            <form className="modal__shows" onSubmit={handleFormSubmit}>
            <div className="modal__flex">
              <input
                type="text"
                className="input__playlist"
                placeholder="Add new playlist.."
                value={playListName}
                onChange={handleInputChange}
                required
              />
                 <span className="delete__modal" onClick={modalIcon}>
              <i className="fa-solid fa-xmark"></i>
            </span>
            </div>
              <div className="list__play">
                {playLists.map(({ _id, title }) => (
                  <label key={_id} className="list__input">
                    <input
                      id={_id}
                      type="checkbox"
                      checked={
                        isInPlaylistVideo(video._id, _id, playLists) ?? false
                      }
                      className="checkbox__input"
                      onChange={(event) =>
                        handlePlaylistInputChange(event, _id)
                      }
                    />
                    {title}
                  </label>
                ))}

              </div>


              <button className="btn__playlist" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>

            </form>
    </div>
  );
};
