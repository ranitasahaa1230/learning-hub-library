import { LOADING, RESET, SHOW_INPUT, SET_NEW_PLAYLIST_NAME } from "./constant";

const playListModalReducer = (playlistModalState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...playlistModalState, loading: action.payload };

    case SHOW_INPUT:
      return { ...playlistModalState, showInput: action.payload };

    case SET_NEW_PLAYLIST_NAME:
      return { ...playlistModalState, playListName: action.payload };
    
      case RESET:
      return {
        ...playlistModalState,
        loading: false,
        showInput: false,
        playListName: "",
      };


    default:
      throw new Error("Action type not found.");
  }
};

export { playListModalReducer };
