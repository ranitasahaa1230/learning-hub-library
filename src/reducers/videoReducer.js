import { videosActions } from "./actionTypes";

const { SET_VIDEOS, SET_ERROR, INITIALIZE, SET_CATEGORY, FILTER_BY_SEARCH } =
  videosActions;

const videoReducer = (videoState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...videoState, loading: true, error: "" };

    case SET_VIDEOS:
      return { ...videoState, loading: false, videos: action.payload };

    case SET_ERROR:
      return { ...videoState, loading: false, error: action.payload };

    case SET_CATEGORY:
      return { ...videoState, selectedCategory: action.payload };

    case FILTER_BY_SEARCH:
      return { ...videoState, searchQuery: action.payload };
      
    default:
      throw new Error("Action type not found.");
  }
};

export { videoReducer };
