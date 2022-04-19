import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { CategoriesBar, VideoCard } from "../../components";

export const VideoListing = () => {
  return (
    <div>
      <Container>
        <CategoriesBar />
        <Row>
          {[...new Array(10)].map((el) => (
            <Col lg={4} md={4}>
              <VideoCard />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
