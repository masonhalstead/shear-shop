import { setJobs } from 'ducks/actions';
import { getProject } from 'ducks/operators/project';
import { normalizeJobs } from 'utils/normalizers';
import { postData } from 'utils/axios';
import { handleError } from './settings';

const filters_map = {
  24: {
    days: 1,
    job_state_id: 7,
  },
  7: {
    days: 7,
    job_state_id: 7,
  },
  queue: {
    days: 7,
    job_state_id: 1,
  },
  starting: {
    days: 7,
    job_state_id: 2,
  },
  running: {
    days: 7,
    job_state_id: 7,
  },
  complete: {
    days: 7,
    job_state_id: 8,
  },
  stopped: {
    days: 7,
    job_state_id: 98,
  },
  failed: {
    days: 7,
    job_state_id: 99,
  },
};
export const getJobsConfig = (project_id, filter) => async dispatch => {
  const [jobs] = await Promise.all([
    dispatch(getJobs(project_id, filters_map[filter])),
    dispatch(getProject(project_id)),
  ]);
  return jobs;
};

export const getJobs = (project_id, filter) => async dispatch => {
  const data = {
    job_state_id: 1,
    days: 1,
    ...filter,
  };
  const res = await postData(`/projects/${project_id}/jobs/query`, data);
  const job = await normalizeJobs(res.data);
  await dispatch(setJobs(job));
  return job;
};

export const addJobBatch = data => async dispatch => {
  try {
    // TODO needs right url to add job batch
    // const res = await postData('', data);
    // return res.data;
  } catch (err) {
    dispatch(handleError(err, data));
    throw err;
  }
};
