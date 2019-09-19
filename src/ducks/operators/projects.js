import { handleError, loginUser, setLoading, setProjects } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData, postData } from 'utils/axios';
import * as Sentry from '@sentry/browser';

export const getProjects = () => async dispatch => {
  await dispatch(setLoading(true));
  try {
    const res = await getData('/projects/list');
    const projects = await normalizeWithUUID(res.data);
    await dispatch(setProjects(projects));
    await dispatch(setLoading(false));
    return projects;
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));
    dispatch(handleError(err));

    dispatch(setProjects([]));
    throw err;
  }
};

export const addProject = params => async dispatch => {
  try {
    await dispatch(setLoading(true));
    const res = await postData('/projects/create', params);
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));
    dispatch(handleError(err));

    throw err;
  }
};

