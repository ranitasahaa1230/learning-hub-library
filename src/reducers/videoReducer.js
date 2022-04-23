import { videosActions } from "./actionTypes";
import {
  UPDATE_LIKE_VIDEOS,
  REMOVE_LIKE_VIDEOS,
  UPDATE_WATCH_LATER_VIDEOS,
  // REMOVE_WATCH_LATER_VIDEOS,
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  CLEAR_ALL_HISTORY,
} from "./constant";

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

    case UPDATE_LIKE_VIDEOS:
      return {
        ...videoState,
        likedVideos: [...action.payload],
      };

    case REMOVE_LIKE_VIDEOS:
      return {
        ...videoState,
        likedVideos: videoState.likedVideos.filter(
          ({ _id }) => _id !== action.payload
        ),
      };

    case UPDATE_WATCH_LATER_VIDEOS:
      return {
        ...videoState,
        watchLater: [...action.payload],
      };

      case ADD_TO_HISTORY:
        return {
          ...videoState,
          history: videoState.history.concat(action.payload),
        };
  
      case REMOVE_FROM_HISTORY:
        return {
          ...videoState,
          history: videoState.history.filter(
            ({ _id }) => _id !== action.payload
          ),
        };
  
      case CLEAR_ALL_HISTORY:
        return {
          ...videoState,
          history: [],
        };

    default:
      throw new Error("Action type not found.");
  }
};

export { videoReducer };
