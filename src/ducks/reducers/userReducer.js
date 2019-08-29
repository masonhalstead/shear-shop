import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from 'ducks/types';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
