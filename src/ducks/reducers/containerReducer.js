import { SET_CONTAINER, CLEAR_CONTAINER } from 'ducks/types';

export const containerReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CONTAINER:
      return action.payload;
    case CLEAR_CONTAINER:
      return {};
    default:
      return state;
  }
};
