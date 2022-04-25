import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { HorizontalCard, Loader, Sidebar } from "../../components";
import { usePlaylist } from "../../contexts";
import { useToast } from "../../hooks";
import { clearAllHistory } from "../../services";
import "./History.css";

export const History = () => {
  const {
    playListState: { history, loading },playListDispatch,
  } = usePlaylist();
  const navigate=useNavigate();
  const { showToast } = useToast();
  const isInHistory = history.length > 0;

  const removeAllHistoryVideo=()=>{
    clearAllHistory(playListDispatch, navigate, showToast);
  }
  return (
    <div className="app__container">
      <Sidebar />
      <Container fluid className="app__main">
        <div className="play__section">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h3 className="video__heading">
                History Video{" "}
                <span className="video__desc">
                  {isInHistory && `(${history.length} videos)`}
                </span>
              </h3>

              <Row>
                {isInHistory && (
                  <span className="ellipsis__trash" onClick={removeAllHistoryVideo}>
                  <span className="ellipsis__text">Clear All</span>
                    <i className="fa-solid fa-trash-can"></i>
                  </span>
                )}
                {isInHistory ? (
                  history.map((video) => (
                      <Col lg={4} md={6}>
                        <HorizontalCard video={video} />
                      </Col>
                  ))
                ) : (
                  <div className="liked__list">
                    <div className="empty-list">
                      Looks like you haven't watch anything yet.
                    </div>
                    <Link to="/" className="continue">
                      <button className="liked__videos">
                        Start Watching Now
                      </button>
                    </Link>
                  </div>
                )}
              </Row>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
