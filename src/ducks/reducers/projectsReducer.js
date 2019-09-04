import { SET_PROJECTS, CLEAR_PROJECTS } from 'ducks/types';

export const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    case CLEAR_PROJECTS:
      return [];
    default:
      return state;
  }
};
