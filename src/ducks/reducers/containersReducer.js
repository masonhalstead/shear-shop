import { SET_CONTAINERS, CLEAR_CONTAINERS } from 'ducks/types';

export const containersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CONTAINERS:
      return action.payload;
    case CLEAR_CONTAINERS:
      return [];
    default:
      return state;
  }
};
