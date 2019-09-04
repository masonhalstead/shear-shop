import { SET_HAMBURGER } from 'ducks/types';

const hamburger = {
  open: false,
};

export const hamburgerReducer = (state = hamburger, action) => {
  switch (action.type) {
    case SET_HAMBURGER:
      return action.payload;
    default:
      return state;
  }
};
