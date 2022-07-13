import React from 'react'
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HorizontalCard, Loader, Sidebar } from "../../components";
import { usePlaylist } from "../../contexts";
import "./UploadVideo.css";

export const UploadVideo = () => {
    const {
        playListState: { uploadVideos, loading },
      } = usePlaylist();
      const isUploadVideo = uploadVideos.length > 0;

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
              Upload Video{" "}
              <span className="video__desc">
                {isUploadVideo && `(${uploadVideos.length} videos)`}
              </span>
            </h3>

            <Row>
              {isUploadVideo ? (
                uploadVideos.map((video) => (
                  <Col lg={4} md={6}>
                  <HorizontalCard video={video}/>
                  </Col>
                ))
              ) : (
                <div className="liked__list">
                  <div className="empty-list">
                    Looks like you haven't uploaded any video yet.
                  </div>
                  <Link to="/" className="continue">
                    <button className="liked__videos">Start Uploading Now</button>
                  </Link>
                </div>
              )}
            </Row>
          </div>
        )}
      </div>
      </Container>
    </div>  )
}
