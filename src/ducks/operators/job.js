import { setJob, setLoading, setJobLogs } from 'ducks/actions';
import { getParameters } from 'ducks/operators/parameters';
import { getContainer } from 'ducks/operators/container';
import { getData, postData } from 'utils/axios';
import { handleError } from './settings';
import { getProject } from './project';

export const getJobConfig = (project_id, job_id) => async dispatch => {
  const job_route = `/jobs/${job_id}`;
  const [job] = await Promise.all([
    dispatch(getJob(project_id, job_id)),
    dispatch(getParameters(job_route)),
  ]);
  return job;
};

export const getJob = (project_id, job_id) => async dispatch => {
  try {
    const res = await getData(`/jobs/${job_id}/`);
    await dispatch(setJob(res.data));
    await dispatch(getContainer(job_id));
    await dispatch(getJobLog(job_id));
    await dispatch(getProject(project_id));
    return res.data;
  } catch (err) {
    dispatch(handleError(err, job_id));

    throw err;
  }
};

export const getJobLog = job_id => async dispatch => {
  try {
    const res = await getData(`/jobs/${job_id}/get_log`);
    await dispatch(setJobLogs(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleError(err, job_id));

    throw err;
  }
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

export const stopJob = (job_id, data) => async dispatch => {
  try {
    await dispatch(setLoading(true));
    const res = await postData(`/jobs/${job_id}/stop`, data);
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));

    throw err;
  }
};
