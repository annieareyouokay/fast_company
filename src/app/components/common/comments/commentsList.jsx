import React from 'react';
import Comment from './comment';
import PropTypes from 'prop-types';

const CommentsList = ({ comments, handleDelete }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} comment={comment} onClick={handleDelete} />
  ));
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  handleDelete: PropTypes.func
};

export default CommentsList;
