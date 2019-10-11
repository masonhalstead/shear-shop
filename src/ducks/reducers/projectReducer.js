import { SET_PROJECT } from 'ducks/types';

export const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload;
    default:
      return state;
  }
};
