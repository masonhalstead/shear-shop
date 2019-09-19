import { setParameters } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData } from 'utils/axios';

export const getParameters = route => async dispatch => {
  const res = await getData(`${route}/parameters`);
  const parameters = await normalizeWithUUID(res.data);
  await dispatch(setParameters(parameters));
  return parameters;
};
