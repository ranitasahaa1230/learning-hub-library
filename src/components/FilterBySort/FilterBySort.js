import React, { useState } from "react";
import { BiSort } from "react-icons/bi";
import { useVideos } from "../../contexts";
import { videosActions } from "../../reducers/actionTypes";
import "./FilterBySort.css";

export const FilterBySort = () => {
  const {
    videoState: { sortBy },
    videoDispatch,
  } = useVideos();
  const { Default, Latest, Earliest } = videosActions;
  const [openSort, showOpenSort] = useState(false);

  const showSort = () => {
    showOpenSort((prev) => !prev);
  };

  return (
    <div className="sorted">
      <div className="sorted__default" onClick={() => showSort()}>
        <BiSort size={32} />
        <span className="default">Sorted By {sortBy}</span>
      </div>

      {openSort && (
        <div className="sorted__videos">
          <label htmlFor="default" className="filter-categories">
            <input
              type="radio"
              name="uploaded"
              id="default"
              className="filter-categories"
              value="default"
              checked={sortBy === Default}
              onChange={() => {
                videoDispatch({ type: Default });
                setTimeout(() => {
                  showSort();
                }, 1000);
              }}
            />
            Default
          </label>

          <label htmlFor="sort-by-latest" className="filter-categories">
            <input
              type="radio"
              name="uploaded"
              id="sort-by-latest"
              className="filter-categories"
              value="sort-by-latest"
              checked={sortBy === Latest}
              onChange={() => {
                videoDispatch({ type: Latest });
                setTimeout(() => {
                  showSort();
                }, 1000);
              }}
            />
            Date followed: Latest
          </label>

          <label htmlFor="sort-by-earliest" className="filter-categories">
            <input
              type="radio"
              name="uploaded"
              id="sort-by-earliest"
              className="filter-categories"
              value="sort-by-earliest"
              checked={sortBy === Earliest}
              onChange={() => {
                videoDispatch({ type: Earliest });
                setTimeout(() => {
                  showSort();
                }, 1000);
              }}
            />
            Date followed: Earliest
          </label>
        </div>
      )}
    </div>
  );
};
