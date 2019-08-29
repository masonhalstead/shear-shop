import { setLoading, setJobs } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
// import { getData } from 'utils/axios';

const jobs_data = [];

export const getJobs = () => async dispatch => {
  await dispatch(setLoading(true));
  // const res = await getData(`/jobs`);
  const jobs = await normalizeWithUUID(jobs_data);
  await dispatch(setJobs(jobs));
  return jobs;
};
