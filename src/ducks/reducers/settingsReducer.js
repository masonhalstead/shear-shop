import {
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SHOW_ALERT,
  TOGGLE_MODAL,
  SET_MENU,
  SET_CURRENT_JOB,
  SET_CURRENT_JOBS,
  SET_CURRENT_DEFINITIONS,
  SAVE_DEFINITION,
  DEFINITION_CHANGED,
} from 'ducks/types';

const settingsState = {
  error_message: '',
  loading: false,
  alert: false,
  jobs_search_input: '',
  definitions_search_input: '',
  definitionChanged: false,
  save_definition: false,
  modals: {
    project: false,
    definitions: false,
    run_definition: false,
  },
};
export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, error_message: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_MENU:
      return { ...state, width: action.width, open: action.open };
    case SAVE_DEFINITION:
      return { ...state, save_definition: action.payload };
    case DEFINITION_CHANGED:
      return { ...state, definitionChanged: action.payload };
    case TOGGLE_MODAL:
      return { ...state, modals: { ...state.modals, ...action.payload } };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case SET_CURRENT_JOB:
      return { ...state, jobs_search_input: action.payload };
    case SET_CURRENT_JOBS:
      return { ...state, jobs_search_input: action.payload };
    case SET_CURRENT_DEFINITIONS:
      return {
        ...state,
        definitions_search_input: action.payload,
      };
    default:
      return state;
  }
};
