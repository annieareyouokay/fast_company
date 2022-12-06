import { createAction, createSlice, nanoid } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { getCurrentUserId } from './users';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreateSuccessed: (state, action) => {
      state.entities = [...state.entities, action.payload];
    },
    commentRemoveSuccessed: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload._id);
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreateSuccessed,
  commentRemoveSuccessed
} = actions;

const commentCreateRequested = createAction('comments/commentCreateRequested');
const commentCreateFailed = createAction('comments/commentCreateFailed');
const commentRemoveRequested = createAction('comments/commentRemoveRequested');
const commentRemoveFailed = createAction('comments/commentRemoveFailed');

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(userId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment =
  (payload) => async (dispatch, getState) => {
    const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      userId: getCurrentUserId()(getState())
    };
    dispatch(commentCreateRequested);
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreateSuccessed(content));
    } catch (error) {
      dispatch(commentCreateFailed());
    }
  };

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const { content } = await commentService.removeComment(commentId);
    if (content === null) {
      console.log(commentId);
      dispatch(commentRemoveSuccessed({ _id: commentId }));
    }
  } catch (error) {
    dispatch(commentRemoveFailed());
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export default commentsReducer;
