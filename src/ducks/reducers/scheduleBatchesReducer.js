import { SET_SCHEDULE_BATCHES } from 'ducks/types';

export const scheduleBatchesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCHEDULE_BATCHES:
      return action.payload;
    default:
      return state;
  }
};
