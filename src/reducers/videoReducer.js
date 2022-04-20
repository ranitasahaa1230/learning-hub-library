import { videosActions } from "./actionTypes";

const { SET_VIDEOS, SET_ERROR, INITIALIZE, SET_CATEGORY, FILTER_BY_SEARCH } =
  videosActions;

const videoReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_VIDEOS:
      return { ...state, loading: false, videos: action.payload };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case FILTER_BY_SEARCH:
      return { ...state, searchQuery: action.payload };

    default:
      throw new Error("Action type not found.");
  }
};

export { videoReducer };
