import { SET_JOB_DEFINITIONS, CLEAR_JOB_DEFINITIONS } from 'ducks/types';

export const definitionsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_JOB_DEFINITIONS:
      return action.payload;
    case CLEAR_JOB_DEFINITIONS:
      return [];
    default:
      return state;
  }
};
