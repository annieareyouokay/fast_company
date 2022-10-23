import React from 'react';
import Comment from './comment';

const CommentsList = () => {
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">add comment</div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <Comment />
          <Comment />
          <Comment/>
        </div>
      </div>
    </>
  );
};

export default CommentsList;
