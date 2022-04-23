import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HorizontalCard, Loader, Sidebar } from "../../components";
import { useVideos } from "../../contexts";
import "./LikedVideo.css";

export const LikedVideo = () => {
  const {
    videoState: { likedVideos, loading },
  } = useVideos();
  const isLikedVideo = likedVideos.length > 0;

  return (
    <div className="app__container">
    <Sidebar/>
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

            <Row>
              {isLikedVideo ? (
                likedVideos.map((video) => (
                  <Col lg={4} md={6}>
                  <HorizontalCard video={video}/>
                  </Col>
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
            </Row>
          </div>
        )}
      </div>
      </Container>
    </div>
  );
};
