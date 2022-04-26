import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../contexts";
import { useToast } from "../../../hooks";
import { deletePlaylist } from "../../../services";
import "./PlaylistPage.css";

export const PlaylistFolder = ({ playFolder }) => {
  const { playListDispatch } = usePlaylist();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const { _id, title, videos } = playFolder;
  const { showToast } = useToast();

  const showHandler=()=>{
      setShowOptions(true);
  }

  const deleteOption = () => {
    setShowOptions(false);
  };

  return (
    <div className="video playlist__video">
      {videos.length > 0 ? (
        <div className="video__top">
          <img
            className="card__playlistFolder"
            src={`${
              videos.length > 0 &&
              `https://i.ytimg.com/vi/${videos[0]._id}/0.jpg`
            }`}
            alt="video-logo"
            onClick={() => navigate(`/playlist/${_id}`)}
          />
          <div
            className="playlist__highlight"
            onClick={() => navigate(`/playlist/${_id}`)}
          >
            <i
              className="fa fa-play-circle playlist__info"
              aria-hidden="true"
            ></i>
            <span className="playlist__num">{videos.length}+</span>
          </div>
        </div>
      ) : (
        <div className="playlist__title">
        <div className="playlist__title">{title} is Empty !</div>
        </div>
      )}

      <div className="playlist__channel">
        <div className="bold__playlist">{title}</div>

        <div className="ellipse" onClick={showHandler}>
          <i className="fa fa-ellipsis-v show__list" aria-hidden="true"></i>
        </div>

        {showOptions && (
          <div className="show__options">
            <div
              className="btn-trash trash__bin"
              onClick={() =>
                deletePlaylist(_id, playListDispatch, navigate, showToast)
              }
            >
              <i className="fa fa-trash trash__options" aria-hidden="true"></i>
              Delete PlayList
            </div>
            <span className="delete__option" onClick={deleteOption}>
                <i className="fa-solid fa-xmark"></i>
              </span>

          </div>
        )}
      </div>
    </div>
  );
};
