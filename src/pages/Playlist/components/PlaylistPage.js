import React from "react";
import { Sidebar, Loader } from "../../../components";
import { Container, Col, Row } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getPlaylistById } from "../../../utlities";
import { usePlaylist } from "../../../contexts";
import { PlaylistCard } from "./PlaylistCard";
import "./PlaylistPage.css";

export const PlaylistPage = () => {
  const { playListId } = useParams();
  const {
    playListState: { playLists, loading },
  } = usePlaylist();
  const playlistVideo = getPlaylistById(playListId, playLists);
  const { title, videos } = playlistVideo;
  const isPlaylistFill = videos.length > 0;

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
                {title}{" "}
                <span className="video__desc">
                  {isPlaylistFill && `(${videos.length} videos)`}
                </span>
              </h3>

              <Row>
                {isPlaylistFill ? (
                  videos.map((video) => (
                    <Col lg={4} md={6}>
                      <PlaylistCard
                        key={video.id}
                        video={video}
                        listId={playListId}
                      />
                    </Col>
                  ))
                ) : (
                  <div className="liked__list">
                    <div className="empty-list">
                      Looks like you haven't added anything in {title}.
                    </div>
                    <Link to="/" className="continue">
                      <button className="liked__videos">
                        Start Adding Now
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
