import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { CategoriesBar, VideoCard } from "../../components";

export const VideoListing = () => {
  return (
    <div>
      <Container>
        <CategoriesBar />
        <Row>
          {[...new Array(20)].map((el) => (
            <Col lg={3} md={4}>
              <VideoCard />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
