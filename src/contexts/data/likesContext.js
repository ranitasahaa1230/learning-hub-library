import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { likesReducer } from "../../reducers";
import { videosActions } from "../../reducers/actionTypes";
const { INITIALIZE, SET_LIKES, SET_ERROR } = videosActions;

const LikeContext = createContext({userTheme:"dark"});

const LikeProvider = ({ children }) => {
  const [likeState, likeDispatch] = useReducer(likesReducer,{
      likedList:[],
      loading:false,
      error:"",
  });

  useEffect(()=>{
    (async()=>{
        try{
        likeDispatch({type:INITIALIZE});
        const res=await axios.get("/api/likes");
        if(res.status===200){
            likeDispatch({type:SET_LIKES, payload:res.data.likes})
        }}catch (err) {
            likeDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
          }
        })()
  },[])

  return (
    <LikeContext.Provider value={{ likeState, likeDispatch }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLikes = () => useContext(LikeContext);

export { useLikes, LikeProvider };
