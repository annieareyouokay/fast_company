import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastUpdate: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceved: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
      state.lastUpdate = Date.now();
    },
    professionsFailed: (state, actions) => {
      state.isLoading = false;
      state.entities = actions.payload;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsFailed } = actions;

const isOutDated = (date) => Date.now() - date > 10 * 60 * 1000;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastUpdate } = getState().professions;
  if (isOutDated(lastUpdate)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsFailed(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find(p => p._id === id);
  }
};

export default professionsReducer;
