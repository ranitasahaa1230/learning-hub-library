import {
  UPDATE_LIKE_VIDEOS,
//   REMOVE_LIKE_VIDEOS,
  UPDATE_WATCH_LATER_VIDEOS,
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  CLEAR_ALL_HISTORY,
  SHOW_INPUT,
  SET_NEW_PLAYLIST_NAME,
  SET_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  DELETE_PLAYLIST,
} from "./constant";

const playListReducer = (playListState, action) => {
  switch (action.type) {
    case UPDATE_LIKE_VIDEOS:
      return {
        ...playListState,
        likedVideos: [...action.payload],
      };

    // case REMOVE_LIKE_VIDEOS:
    //   return {
    //     ...playListState,
    //     likedVideos: playListState.likedVideos.filter(
    //       ({ _id }) => _id !== action.payload
    //     ),
    //   };

    case UPDATE_WATCH_LATER_VIDEOS:
      return {
        ...playListState,
        watchLater: [...action.payload],
      };

      case ADD_TO_HISTORY:
        return {
          ...playListState,
          history: playListState.history.concat(action.payload).reverse(),
        };
  
      case REMOVE_FROM_HISTORY:
        return {
          ...playListState,
          history: playListState.history.filter(
            ({ _id }) => _id !== action.payload
          ),
        };
  
      case CLEAR_ALL_HISTORY:
        return {
          ...playListState,
          history: [],
        };

        case SET_PLAYLIST:
      return { ...playListState, playLists: action.payload };

      case SHOW_INPUT:
      return { ...playListState, showInput: action.payload };

    case SET_NEW_PLAYLIST_NAME:
      return { ...playListState, playListName: action.payload };

      case ADD_TO_PLAYLIST:
        return {
          ...playListState,
          playLists: playListState.playLists.map((playlist) =>
            playlist._id === action.payload.playlistId
              ? { ...playlist, videos: playlist.videos.concat(action.payload.video) }
              : playlist
          ),
        };
  
      case REMOVE_FROM_PLAYLIST:
        return {
            ...playListState,
            playLists: playListState.playLists.map((playlist) =>
            playlist._id === action.payload.playlistId
                ? {
                    ...playlist,
                    videos: playlist.videos.filter(
                      (video) => video._id !== action.payload.videoId
                    ),
                  }
                : playlist
            ),
        };
  
      case DELETE_PLAYLIST:
        return {
        //   ...playListState,
        //   playLists: [],
        ...playListState,
        playLists: playListState.playLists.filter(
          ({ _id }) => _id !== action.payload
        ),
        };

    default:
      throw new Error("Action type not found.");
  }
};

export { playListReducer };
