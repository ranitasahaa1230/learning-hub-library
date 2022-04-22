const getSearchedVideos = (videoListing, searchQuery) => {
    return videoListing.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  export { getSearchedVideos };