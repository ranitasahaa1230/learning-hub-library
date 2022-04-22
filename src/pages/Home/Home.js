import React from "react";
import { Container } from "react-bootstrap";
import { Sidebar } from "../../components";
import { VideoListing } from "../VideoListing/VideoListing";
import "./Home.css";

export const Home = () => {
  return (
      <div className="app__container">
        <Sidebar />
        <Container fluid className="app__main">
          <VideoListing />
        </Container>
      </div>
  );
};
