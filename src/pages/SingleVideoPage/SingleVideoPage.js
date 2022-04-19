import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks";

export const SingleVideoPage = () => {
  const [video, setVideo] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { showToast } = useToast();
  // const {
  //   authState: {
  //     userDetails: { token },
  //   },
  // } = useAuth();

  const { _id, title, creator, uploaded } = video ?? {};

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
        showToast("error", "Could not fetch the videos.");
      }
    })();
  }, [videoId]);

  return (
    <>
      {loader ? (
        "Loading..."
      ) : (
        <div className="play-container">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen=""
          ></iframe>
        </div>
      )}
    </>
  );
};
