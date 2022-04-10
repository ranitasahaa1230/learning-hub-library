import React from "react";
import { Container } from "react-bootstrap";
import { Sidebar } from "../../components";
import { VideoListing } from "../VideoListing/VideoListing";
import "./Home.css";

export const Home = ({ sidebars, handleToggleSidebar }) => {
  return (
    <div className="section__page">
      <div className="app__container">
        <Sidebar
          sidebars={sidebars}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Container fluid className="app__main">
          <VideoListing />
        </Container>
      </div>
    </div>
  );
};
