import { setJobs } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { postData } from 'utils/axios';

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
