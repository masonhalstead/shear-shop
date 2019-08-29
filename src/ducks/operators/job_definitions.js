import { setLoading, setJobDefinitions } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
// import { getData } from 'utils/axios';

const job_data = {};

export const getJobDefinitions = () => async dispatch => {
  await dispatch(setLoading(true));
  // const res = await getData(`/jobs/${job_id}`);
  const job = await normalizeWithUUID(job_data);
  await dispatch(setJobDefinitions(job));
  return job;
};
