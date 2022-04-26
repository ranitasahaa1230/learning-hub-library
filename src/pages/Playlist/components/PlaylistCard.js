import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../contexts";
import { useToast } from "../../../hooks";
import { AiFillEye } from "react-icons/ai";
import { removeFromPlaylist } from "../../../services";

export const PlaylistCard = ({ video, listId }) => {
  const { _id, title, creator, uploaded, time, thumbnail, views } = video;
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  const { playListDispatch } = usePlaylist();
  const { showToast } = useToast();

  const showHandler = () => {
    setShowList(true);
  };

  const deleteOption = () => {
    setShowList(false);
  };

  return (
    <div className="video playlist__video">
      <div className="video__top">
        <img
          className="video__img"
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt="video-logo"
          onClick={() => navigate(`/video/${_id}`)}
        />
        <span className="video__top__duration">{time}</span>
      </div>
      <div className="video__channel ellipse__handler">
        <img src={thumbnail} alt="video-thumbnail" />
        <div className="bold__text">{title}</div>

        <div className="ellipsis" onClick={showHandler}>
          <i className="fa fa-ellipsis-v show__list" aria-hidden="true"></i>
        </div>

        {showList && (
          <div className="card__options">
            <div
              className="btn-trash trash__bin"
              onClick={() =>
                removeFromPlaylist(_id, listId, playListDispatch, showToast)
              }
            >
              <i className="fa fa-trash trash__options" aria-hidden="true"></i>
              Remove from PlayList
            </div>
            <span className="delete__option" onClick={deleteOption}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
        )}
      </div>

      <h3 className="video__title">{creator}</h3>
      <div className="video__details">
        <span>
          <b>
            <AiFillEye />{" "}
          </b>{" "}
          {views} Views{" "}
        </span>{" "}
        <span>
          <b>•</b> {uploaded}
        </span>
      </div>
    </div>
  );
};
