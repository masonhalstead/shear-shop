import { setLoading, loginUser } from 'ducks/actions';
import { handleError } from  'ducks/operators/settings';
import { publicPost } from 'utils/axios';
import uuid from 'uuid';

export const login = params => async dispatch => {
  await dispatch(setLoading(true));

  try {
    const res = await publicPost('/authentication/login', params);
    res.data.uuid = uuid.v1();
    if (res.data.authentication_result_id === 1) {
      await localStorage.setItem('public_key', res.data.public_key);
      await localStorage.setItem('private_key', res.data.private_key);
    }
    await dispatch(loginUser(res.data));
    await dispatch(setLoading(false));
    return res.data;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(loginUser({}));
    throw err;
  }
};
