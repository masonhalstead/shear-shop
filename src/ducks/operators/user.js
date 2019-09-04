import { setLoading, loginUser } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { publicPost } from 'utils/axios';
import * as Sentry from '@sentry/browser';

export const login = () => async dispatch => {
  await dispatch(setLoading(true));

  try {
    const res = await publicPost('/authentication/login');
    const user = await normalizeWithUUID(res);
    await dispatch(loginUser(user));
    return user;
  } catch (err) {
    Sentry.captureException(err);
    await dispatch(setLoading(false));

    dispatch(loginUser({}));
    throw err;
  }
};
