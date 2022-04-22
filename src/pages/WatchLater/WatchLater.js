import React from "react";
import { Link } from "react-router-dom";
import { VideoCard } from "../../components";
import { useVideos } from "../../contexts";
import "./WatchLater.css";

export const WatchLater = () => {
  const {
    videoState: { watchLater, loading },
  } = useVideos();
  const isInWatchLaterVideo = watchLater.length > 0;

  return (
    <div className="section__page ">
      <div className="play-container">
        {loading ? (
          "Loadingg........."
        ) : (
          <div>
            <h3 className="video__heading">
              Watch Later Video{" "}
              <span className="video__desc">
                {isInWatchLaterVideo && `(${watchLater.length} videos)`}
              </span>
            </h3>

            <ul className="video__likes">
              {isInWatchLaterVideo ? (
                watchLater.map((video) => (
                  <VideoCard video={video}/>
                ))
              ) : (
                <div className="liked__list">
                  <div className="empty-list">
                  Looks like you haven't added anything yet in Watch Later.
                  </div>
                  <Link to="/" className="continue">
                    <button className="liked__videos">Start Adding Now</button>
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
