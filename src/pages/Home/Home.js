import React from "react";
import { Container } from "react-bootstrap";
import { Loader, Sidebar } from "../../components";
import { useVideos } from "../../contexts";
import { VideoListing } from "../VideoListing/VideoListing";
import "./Home.css";

export const Home = () => {
  const {
    videoState: { loading },
  } = useVideos();
  return (
    <div className="app__container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Sidebar />
          <Container fluid className="app__main">
            <VideoListing />
          </Container>
        </>
      )}
    </div>
  );
};
