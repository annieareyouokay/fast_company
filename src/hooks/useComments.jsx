import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { nanoid } from 'nanoid';
import commentService from '../app/services/comment.service';
import { toast } from 'react-toastify';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    toast.error(error);
    setError(null);
  }, [error]);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments(prevState => ([...prevState, content]));
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments(prevState => prevState.filter(c => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <CommentsContext.Provider value={{ isLoading, createComment, removeComment, comments }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CommentsProvider;
