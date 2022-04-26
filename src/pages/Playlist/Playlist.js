import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Loader, Sidebar } from "../../components";
import { usePlaylist } from "../../contexts";
import { Link } from "react-router-dom";
import { PlaylistFolder } from "./components/PlaylistFolder";

export const Playlist = () => {
  const {
    playListState: { playLists, loading },
  } = usePlaylist();
  const isPlaylistFill = playLists.length > 0;

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
                Your Playlist{" "}
                <span className="video__desc">
                  {isPlaylistFill && `(${playLists.length} playlists)`}
                </span>
              </h3>

              <Row>
                {isPlaylistFill ? (
                  playLists.map((playFolder) => (
                    <Col lg={4} md={6}>
                      <PlaylistFolder
                        key={playFolder._id}
                        playFolder={playFolder}
                      />
                    </Col>
                  ))
                ) : (
                  <div className="liked__list">
                    <div className="empty-list">
                      Looks like you haven't created any Playlist.
                    </div>
                    <Link to="/" className="continue">
                      <button className="liked__videos">
                        Start Creating Now
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
