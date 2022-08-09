import React from "react";

const Bookmark = ({bookmark, handleToogleBookmark}) => (
  <button onClick={handleToogleBookmark}>
    <h2>
      <i className={`bi bi-star${bookmark ? "-fill" : ""}`} />
    </h2>
  </button>
);

export default Bookmark;
