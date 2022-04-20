import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineWatchLater, MdThumbUp, MdPlaylistAdd } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast, useDocumentTitle } from "../../hooks";
import "./SingleVideoPage.css";

export const SingleVideoPage = () => {
  const [loader, setLoader] = useState(false);
  const [video, setVideo] = useState(null);
  const { videoId } = useParams();
  const { showToast } = useToast();
  useDocumentTitle("Single Video Details");

  const { title, description, creator, uploaded, views, thumbnail} = video ?? {};

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const {
          data: { video },
        } = await axios.get(`/api/video/${videoId}`);
        setVideo(video);
        setLoader(false);
      } catch (error) {
        showToast("error", "Could not fetch the videos.");
      }
    })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div className="section__page">
      <div className="single__video">
        {loader ? (
          "Loading..."
        ) : (
          <div className="play-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            ></iframe>
            <div className="bold__texts">{title}</div>
            <div className="video__channels">
              <img
                src={thumbnail}
                alt="video-thumbnail"
              />
              <div className="video__titled">
                <div className="video__feat">
                  <div className="video__detail">{creator}</div>
                  <div className="span__views">
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
              </div>
            </div>

            <div className="dislay__flex">
              <div className="video__features">
                <li>
                  <MdThumbUp size={25} />
                  <span className="video__space">Like</span>
                </li>
              </div>
              <div className="video__features">
                <li>
                  <MdOutlineWatchLater size={25} />
                  <span className="video__space">Watch Later</span>
                </li>
              </div>
              <div className="video__features">
                <li>
                  <MdPlaylistAdd size={25} />
                  <span className="video__space">Save To Playlist</span>
                </li>
              </div>
            </div>
            <div className="desc__video">{description}</div>
            <hr />
            <div>
              <div className="comments__section">
                <h5>
                  <i className="fa fa-align-left"></i>
                </h5>
                <div>Comments :</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
