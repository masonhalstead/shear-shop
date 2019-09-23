import { setJobs } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { postData } from 'utils/axios';
import { handleError } from './settings';

export const getJobs = ({
  project_id,
  state_id = 1,
  days = 1,
}) => async dispatch => {
  const data = {
    job_state_id: state_id,
    days,
  };
  const res = await postData(`/projects/${project_id}/jobs/query`, data);
  const job = await normalizeWithUUID(res.data);
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
