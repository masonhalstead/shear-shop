import { SET_ERROR_MESSAGE, SET_LOADING } from 'ducks/types';

const settingsState = {
  error_message: '',
  loading: false,
};
export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, error_message: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
