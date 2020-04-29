import { SET_ERROR_MESSAGE } from 'ducks/types';

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
    batch: false,
  },
  editBatchRow: {
    jobId: '',
    batchName: '',
  },
};
export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, error_message: action.payload };
    default:
      return state;
  }
};
