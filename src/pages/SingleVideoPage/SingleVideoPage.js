import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { Container } from "react-bootstrap";
import {
  MdOutlineWatchLater,
  MdThumbUp,
  MdPlaylistAdd,
} from "react-icons/md";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { useToast, useDocumentTitle } from "../../hooks";
import "./SingleVideoPage.css";
import { useAuth, useVideos } from "../../contexts";
import { isInLikedVideo, isInWatchLaterVideo } from "../../utlities";
import { addToLikes, addToWatchLater, removeFromLikes, removeFromWatchLater } from "../../services";
import { Sidebar } from "../../components";

export const SingleVideoPage = () => {
  const [loader, setLoader] = useState(false);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { showToast } = useToast();
  const {videoState:{likedVideos, watchLater}, videoDispatch}=useVideos();
  const {state:{user}}=useAuth();

  useDocumentTitle("Single Video Details");
  const { _id, title, description, creator, uploaded, views, thumbnail} = video ?? {};

  const videoInLiked=isInLikedVideo(likedVideos,_id);
  const videoInWatchLater=isInWatchLaterVideo(watchLater,_id);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const {
          data: { video },
        } = await axios.get(`/api/video/${videoId}`);
        setVideo(video);
        setLoader(false);
      } catch (error) {
        showToast("Could not fetch the videos.", "error");
      }
    })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const handleLikeHandler=()=>{
    if(!user){
      navigate('/login')
    }else{
      if(!videoInLiked){
        console.log('Liked 00', _id)
        addToLikes(video,videoDispatch,showToast)
      }else{
        removeFromLikes( _id,videoDispatch, showToast)
        console.log('DisLiked', video)
      }
    }
  }

  const handleWatchLater=()=>{
    if(!user){
      navigate('/login')
    }else{
      console.log('ADDED')
      if(!videoInWatchLater){
        console.log('Liked 00', _id)
        addToWatchLater(video,videoDispatch,showToast)
        console.log('Liked', video)
      }else{
        removeFromWatchLater( _id,videoDispatch, showToast)
        console.log('DisLiked', video)
      }
    }
  }

  return (
    <div className="app__container">
      <Sidebar/>
      <Container fluid className="app__main">
      <div className="play__section">
        {loader ? (
          "Loading..."
        ) : (
          <div className="play-containers">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen=""
            ></iframe>
            <div className="bold__texts">{title}</div>
            <div className="video__channels">
              <img
                src={thumbnail}
                alt="video-thumbnail"
              />
              <div className="video__titled">
                <div className="video__feat">
                  <div className="video__detail">{creator}</div>
                  <div className="span__views">
                    <span>
                      <b>
                        <AiFillEye />{" "}
                      </b>{" "}
                      {views} Views{" "}
                    </span>{" "}
                    <span>
                      <b>•</b> {uploaded}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dislay__flex">
              <div className="video__features" onClick={handleLikeHandler}>
                <li>
                  <MdThumbUp size={25} />
                  <span className="video__space">{videoInLiked ? "Liked" :"Like"}</span>
                </li>
              </div>
              <div className="video__features" onClick={handleWatchLater}>
                <li>
                  <MdOutlineWatchLater size={25} />
                  <span className="video__space">{videoInWatchLater ? "Will Watch Later" : "Watch Later"}</span>
                </li>
              </div>
              <div className="video__features">
                <li>
                  <MdPlaylistAdd size={25} />
                  <span className="video__space">Save To Playlist</span>
                </li>
              </div>
            </div>
            <div className="desc__video">{description}</div>
            <hr />
            <div>
              <div className="comments__section">
                <h5>
                  <i className="fa fa-align-left"></i>
                </h5>
                <div>Comments :</div>
              </div>
            </div>
            </div>
        )}
        </div>
      </Container>
    </div>
  );
};
