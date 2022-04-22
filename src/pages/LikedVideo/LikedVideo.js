import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader, Sidebar, VideoCard } from "../../components";
import { useVideos } from "../../contexts";
import "./LikedVideo.css";

export const LikedVideo = () => {
  const {
    videoState: { likedVideos, loading },
  } = useVideos();
  const isLikedVideo = likedVideos.length > 0;

  return (
    <div className="app__container">
    {/* <Sidebar/> */}
    <Container fluid className="app__main">
      <div className="play__section">
        {loading ? (
          <Loader/>
        ) : (
          <div>
            <h3 className="video__heading">
              Liked Video{" "}
              <span className="video__desc">
                {isLikedVideo && `(${likedVideos.length} videos)`}
              </span>
            </h3>

            <ul className="video__likes">
              {isLikedVideo ? (
                likedVideos.map((video) => (
                  <VideoCard video={video}/>
                ))
              ) : (
                <div className="liked__list">
                  <div className="empty-list">
                    Looks like you haven't liked anything yet.
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
      </Container>
    </div>
  );
};
