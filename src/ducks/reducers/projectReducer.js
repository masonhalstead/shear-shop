import { CLEAR_PROJECT, SET_PROJECT } from 'ducks/types';

export const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload;
    case CLEAR_PROJECT:
      return {};
    default:
      return state;
  }
};
