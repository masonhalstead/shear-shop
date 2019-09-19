import { SET_ERROR_MESSAGE, SET_LOADING, SET_PROJECT, SHOW_ALERT } from 'ducks/types';

const settingsState = {
  error_message: '',
  loading: false,
  alert: false,
  project: {},
};
export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, error_message: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case SET_PROJECT:
      return { ...state, project: action.payload };
    default:
      return state;
  }
};
