import { videosActions } from "./actionTypes";

const { SET_LIKES, SET_ERROR, INITIALIZE} =
  videosActions;

const likesReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_LIKES:
      return { ...state, loading: false, likedList: action.payload };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Action type not found.");
  }
};

export { likesReducer };
