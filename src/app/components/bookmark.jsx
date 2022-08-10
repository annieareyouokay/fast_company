import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, handleToogleBookmark }) => (
  <button onClick={handleToogleBookmark}>
    <h2>
      <i className={`bi bi-star${bookmark ? '-fill' : ''}`} />
    </h2>
  </button>
);

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  handleToogleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
