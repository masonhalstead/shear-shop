import { setParameters, clearParameters } from 'ducks/actions';
import { normalizeParameters } from 'utils/normalizers';
import { handleError } from 'ducks/operators/settings';
import { getData, postData } from 'utils/axios';

export const getParameters = route => async dispatch => {
  const res = await getData(`${route}/parameters`);
  const parameters = await normalizeParameters(res.data);
  await dispatch(setParameters(parameters));
  return parameters;
};

export const editParameters = (parameters, definition_id) => async dispatch => {
  try {
    const promises = await parameters.map(parameter =>
      editParameter(parameter, definition_id),
    );
    const res = await Promise.all(promises);
    dispatch(clearParameters());
    return res;
  } catch (err) {
    dispatch(handleError(err, parameters));
    throw err;
  }
};

export const saveParameters = (parameters, definition_id) => async dispatch => {
  try {
    const promises = await parameters.map(parameter =>
      saveParameter(parameter, definition_id),
    );
    const res = await Promise.all(promises);
    dispatch(clearParameters());
    return res;
  } catch (err) {
    dispatch(handleError(err, parameters));
    throw err;
  }
};

export const editParameter = (parameter, definition_id) => {
  // TODO: add more validation to parameters
  if (!parameter.parameter_name || !parameter.saved) {
    return null;
  }
  const route = `/job_definitions/${definition_id}/parameters/${parameter.parameter_name}/update`;
  return postData(route, parameter);
};

export const saveParameter = (parameter, definition_id) => {
  // TODO: add more validation to parameters
  if (!parameter.parameter_name || parameter.saved) {
    return null;
  }
  const route = `/job_definitions/${definition_id}/parameters/${parameter.parameter_name}/create`;
  return postData(route, parameter);
};
