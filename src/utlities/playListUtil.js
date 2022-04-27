export const isInPlaylistVideo = (videoId, playlistId, playLists) => {
  return playLists
    ?.find((playlist) => playlist._id === playlistId)
    ?.videos.some((playlist) => playlist._id === videoId);
};

export const getPlaylistById = (playlistId, playLists) => {
  return playLists?.find((playlist) => playlist._id === playlistId);
};
