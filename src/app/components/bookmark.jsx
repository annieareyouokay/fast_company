import React from "react";

const Bookmark = ({bookmark, ...rest}) => <button onClick={rest.handleToogleBookmark}><h2><i className={bookmark ? "bi bi-star-fill": "bi bi-star" }/></h2></button>

export default Bookmark;