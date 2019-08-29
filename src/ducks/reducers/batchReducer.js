import { SET_BATCH, CLEAR_BATCH } from 'ducks/types';

export const batchReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BATCH:
      return action.payload;
    case CLEAR_BATCH:
      return {};
    default:
      return state;
  }
};
