import { setLoading, setJobDefinition, loginUser, handleError } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { postData } from 'utils/axios';
import * as Sentry from '@sentry/browser';

const job_data = {};

export const getJobDefinition = def_id => async dispatch => {
  await dispatch(setLoading(true));
  // const res = await getData(`/jobs/${job_id}`);
  const job = await normalizeWithUUID(job_data);
  await dispatch(setJobDefinition(job));
  return job;
};

export const addJobDefinition = params => async dispatch => {
  try {
    await dispatch(setLoading(true));
    const res = await postData('/job_definitions/create', params);
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));
    dispatch(handleError(err));

    throw err;
  }
};
