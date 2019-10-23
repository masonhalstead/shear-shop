import { setParameters } from 'ducks/actions';
import { normalizeParameters } from 'utils/normalizers';
import { getData } from 'utils/axios';
import { handleError } from './settings';

export const getParameters = route => async dispatch => {
  try {
    const res = await getData(`${route}/parameters`);
    const parameters = await normalizeParameters(res.data);
    await dispatch(setParameters(parameters));
    return parameters;
  } catch (err) {
    dispatch(handleError(err, route));
    throw err;
  }
};
