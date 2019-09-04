import { setLoading, setProjects } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData } from 'utils/axios';
import * as Sentry from '@sentry/browser';

export const getProjects = () => async dispatch => {
  await dispatch(setLoading(true));
  try {
    const res = await getData('/projects/list');
    const projects = await normalizeWithUUID(res);
    await dispatch(setProjects(projects));
    return projects;
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));

    dispatch(setProjects([]));
    throw err;
  }
};
