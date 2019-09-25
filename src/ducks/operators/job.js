import { setJob, setLoading } from 'ducks/actions';
import { getParameters } from 'ducks/operators/parameters';
import { getData, postData } from 'utils/axios';
import { handleError } from './settings';

export const getJobConfig = job_id => async dispatch => {
  const job_route = `/jobs/${job_id}`;
  const [job] = await Promise.all([
    dispatch(getJob(job_id)),
    dispatch(getParameters(job_route)),
  ]);
  return job;
};

export const getJob = job_id => async dispatch => {
  const res = await getData(`/jobs/${job_id}`);
  await dispatch(setJob(res.data));
  return res.data;
};

export const addJob = data => async dispatch => {
  try {
    await dispatch(setLoading(true));
    const res = await postData('/jobs/create', data);
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));

    throw err;
  }
};
