import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useVideos } from "../../contexts";
import { useToast } from "../../hooks";
import {
  removeFromHistory,
  removeFromLikes,
  removeFromWatchLater,
} from "../../services";
import "./HorizontalCard.css";

export const HorizontalCard = ({ video }) => {
  const { _id, title, creator, uploaded, thumbnail, views, time } = video;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const { videoDispatch } = useVideos();

  const removeFromLikedVideo = () => {
    removeFromLikes(_id, videoDispatch, showToast);
  };

  const removeFromWatchLaterVideo = () => {
    removeFromWatchLater(_id, videoDispatch, showToast);
  };

  const removeFromHistoryVideo = () => {
    removeFromHistory(_id, videoDispatch, showToast);
  };

  return (
    <div className="video horizontal__video" key={_id}>
      <div className="video__top" onClick={() => navigate(`/video/${_id}`)}>
        <img
          src={`https://i.ytimg.com/vi/${_id}/0.jpg`}
          alt="video-logo"
          className="video__img"
        />
        <span className="video__top__duration">{time}</span>
      </div>
      <div className="video__channel">
        <img src={thumbnail} alt="video-thumbnail" />
        <div className="bold__text">{title}</div>
        {pathname === "/liked-videos" && (
          <div className="ellipsis">
            <i
              className="fa-solid fa-trash delete__icon"
              onClick={removeFromLikedVideo}
            ></i>
          </div>
        )}

        {pathname === "/watch-later" && (
          <div className="ellipsis">
            <i
              className="fa-solid fa-trash delete__icon"
              onClick={removeFromWatchLaterVideo}
            ></i>
          </div>
        )}

        {pathname === "/history" && (
          <div className="ellipsis">
            <i
              className="fa-solid fa-trash delete__icon"
              onClick={removeFromHistoryVideo}
            ></i>
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
