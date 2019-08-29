import { SET_JOBS, CLEAR_JOBS } from 'ducks/types';

export const jobsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_JOBS:
      return action.payload;
    case CLEAR_JOBS:
      return [];
    default:
      return state;
  }
};
