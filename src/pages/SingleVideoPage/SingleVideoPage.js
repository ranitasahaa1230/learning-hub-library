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

  const { _id, title, description, creator, uploaded } = video ?? {};

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
                src="data:image/png;base64,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"
                alt="video-thumbnail"
              />
              <div className="video__titled">
                <div className="video__detai">
                  <div className="video__detail">{creator}</div>
                  <div className="span__views">
                    <span>
                      <b>
                        <AiFillEye />{" "}
                      </b>{" "}
                      5M Views{" "}
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
