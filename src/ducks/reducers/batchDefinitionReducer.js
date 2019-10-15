import { SET_BATCH_DEFINITIONS, CLEAR_BATCH_DEFINITIONS } from 'ducks/types';

export const batchDefinitionReducer = (state = [], action) => {
  switch (action.type) {
    case SET_BATCH_DEFINITIONS:
      return action.payload;
    case CLEAR_BATCH_DEFINITIONS:
      return [];
    default:
      return state;
  }
};
