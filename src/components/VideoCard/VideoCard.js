import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
  const { _id, title, creator, uploaded, thumbnail, views, time } = video;
  const navigate = useNavigate();

  return (
    <div className="video" key={_id}>
      <div className="video__top" onClick={() => navigate(`/video/${_id}`)}>
        <img src={`https://i.ytimg.com/vi/${_id}/0.jpg`} alt="video-logo" />
        <span className="video__top__duration">{time}</span>
      </div>
      <div className="video__channel">
        <img src={thumbnail} alt="video-thumbnail" />
        <div className="bold__text">{title}</div>
        <div className="ellipsis">
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
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
