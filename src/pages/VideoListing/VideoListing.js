import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { CategoriesBar, VideoCard } from "../../components";
import { useVideos } from "../../contexts";
import "./VideoListing.css";

export const VideoListing = () => {
  const {videoState:{loading, pageNum, totalPages}, finalVideoList } = useVideos();

  const [lastVideo, setLastVideo] = useState(null);

  //Infinite
  const observer = useRef(
    new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                videoDispatchFunction({ type: SET_PAGE_NUMBER });
            }
        },
        { threshold: 1 }
    )
);

useEffect(() => {
    //setting the latest last video to be observed
    const currentObserver = observer.current;
    if (lastVideo) {
        currentObserver.observe(lastVideo);
    }
    return () => {
      if (lastVideo) {
          //unsetting the previous last video
          currentObserver.disconnect();
      }
  };
}, [lastVideo]);

  return (
    <div className="section__pages">
      <Container>
        <CategoriesBar />
        <Row>
          {finalVideoList.length ? (
            finalVideoList?.map((video,index) => (
            index === finalVideoList.length - 1 && !loading && pageNum < totalPages ? (
              <Col lg={4} md={6}>
                <VideoCard ref={setLastVideo} key={video._id} video={video} />
              </Col>
            ):(
              <VideoCard key={video._id} video={video} />
            )
            })}
          {/* ) : (
            <h3 className="text__quiz">No Videos Available...</h3>
          )} */}
          
      {loading && (
        <div className="App">
          <div className="loader">Loading......</div>
        </div>
      )}
      <div ref={loader} />

        </Row>
      </Container>
    </div>
  );
};
