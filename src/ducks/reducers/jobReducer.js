import { SET_JOB, CLEAR_JOB, SET_JOB_LOGS } from 'ducks/types';
const initial_state = {
  job: {},
  job_logs: [],
};
export const jobReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_JOB:
      return { ...state, job : action.payload};
    case SET_JOB_LOGS:
      return {
        ...state, job_logs: action.payload,
      };
    case CLEAR_JOB:
      return {};
    default:
      return state;
  }
};
