const sortVideoList = (videos, sortBy) => {
  if (sortBy === "Latest")
    return [...videos].sort((item1, item2) => new Date(item2.uploaded)- new Date(item1.uploaded));
  if (sortBy === "Earliest")
    return [...videos].sort((item1, item2) => new Date(item1.uploaded) - new Date(item2.uploaded));

  return videos;
};
export { sortVideoList };
