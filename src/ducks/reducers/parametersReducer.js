import { SET_PARAMETERS, CLEAR_PARAMETERS } from 'ducks/types';

export const parametersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PARAMETERS:
      return action.payload;
    case CLEAR_PARAMETERS:
      return [];
    default:
      return state;
  }
};
