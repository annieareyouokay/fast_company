import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, handleToggleBookmark }) => (
  <button onClick={handleToggleBookmark}>
    <h2>
      <i className={`bi bi-star${bookmark ? '-fill' : ''}`} />
    </h2>
  </button>
);

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;