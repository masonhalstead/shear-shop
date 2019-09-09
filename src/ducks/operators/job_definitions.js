import { setLoading, setJobDefinitions } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import * as Sentry from '@sentry/browser';
import { getData } from 'utils/axios';

export const getJobDefinitions = () => async dispatch => {
  await dispatch(setLoading(true));
  try {
    const res = await getData('/job_definitions/list');
    const definitions = await normalizeWithUUID(res.data);
    await dispatch(setJobDefinitions(definitions));
    await dispatch(setLoading(false));
    return definitions;
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));

    dispatch(setJobDefinitions([]));
    throw err;
  }
};
