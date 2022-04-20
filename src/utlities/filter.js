const filterVideoList = (selectedCategory, videos) => {
    let temp = [...videos];
    if (!(selectedCategory === "all")) {
      return temp.filter(video => video.category === selectedCategory);
    }
    return temp;
  };
  
  export { filterVideoList };