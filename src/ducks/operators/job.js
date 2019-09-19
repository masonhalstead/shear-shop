import { setJob } from 'ducks/actions';
import { getParameters } from 'ducks/operators/parameters';
import { getData } from 'utils/axios';

export const getJobConfig = job_id => async dispatch => {
  const job_route = `/jobs/${job_id}/parameters`;
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
