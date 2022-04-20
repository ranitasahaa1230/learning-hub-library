import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { CategoriesBar, VideoCard } from "../../components";
import { useVideos } from "../../contexts";
import "./VideoListing.css";

export const VideoListing = () => {
  const { finalVideoList } = useVideos();

  return (
    <div className="section__page">
      <Container>
        <CategoriesBar />
        <Row>
          {finalVideoList.length ? (
            finalVideoList?.map((video) => (
              <Col lg={4} md={6}>
                <VideoCard key={video._id} video={video} />
              </Col>
            ))
          ) : (
            <h3 className="text__quiz">No Videos Available...</h3>
          )}
        </Row>
      </Container>
    </div>
  );
};
