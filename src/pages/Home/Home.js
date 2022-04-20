import React from "react";
import { Container } from "react-bootstrap";
import { VideoListing } from "../VideoListing/VideoListing";
import "./Home.css";

export const Home = () => {
  return (
    <div className="section__page">
      <main className="app__container">
        <Container fluid className="app__main">
          <VideoListing />
        </Container>
      </main>
    </div>
  );
};
