import { SET_BATCHES, CLEAR_BATCHES } from 'ducks/types';

export const batchesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BATCHES:
      return action.payload;
    case CLEAR_BATCHES:
      return [];
    default:
      return state;
  }
};
