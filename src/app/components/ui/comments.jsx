import React from 'react';
import _ from 'lodash';
import CommentsList from '../common/comments/commentsList';
import AddCommentForm from '../common/comments/addCommentForm';
import { useComments } from '../../../hooks/useComments';

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
    // API.comments
    //   .add({
    //     ...data,
    //     pageId: userId
    //   })
    //   .then((comment) => {
    //     setComments((prevState) => [comment, ...prevState]);
    //   });
  };

  const handleDelete = (id) => {
    removeComment(id);
    // API.comments.remove(id).then((id) => {
    //   setComments(comments.filter((comment) => comment._id !== id));
    // });
  };

  const sortedComments = _.orderBy(comments, 'created_at', 'desc');
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <div className="card mb-2">
            <div className="card-body">
              <div>
                <h2>New comment</h2>
                <AddCommentForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {sortedComments.length ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Comments;
