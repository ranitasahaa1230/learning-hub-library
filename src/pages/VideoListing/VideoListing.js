import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { CategoriesBar, VideoCard } from "../../components";
import { useVideos } from "../../contexts";

export const VideoListing = () => {
  const {
    videoState: { videos },
  } = useVideos();

  return (
    <div>
      <Container>
        <CategoriesBar />
        <Row>
          {videos.length ? (
            videos.map((video) => (
              <Col lg={4} md={6}>
                <VideoCard key={video._id} video={video} />
              </Col>
            ))
          ) : (
            <div className="text__quiz">No Videos Available...</div>
          )}
        </Row>
      </Container>
    </div>
  );
};
