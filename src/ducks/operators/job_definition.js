import { setLoading, setJobDefinition } from 'ducks/actions';
import { getParameters } from 'ducks/operators/parameters';
import { handleError } from 'ducks/operators/settings';
import { getData, postData } from 'utils/axios';

export const getJobDefinition = definition_id => async dispatch => {
  const definition_route = `/job_definitions/${definition_id}`;
  const definition = await Promise.all([
    dispatch(getDefinition(definition_id)),
    dispatch(getParameters(definition_route)),
  ]);
  return definition;
};

export const getDefinition = definition_id => async dispatch => {
  const res = await getData(`/job_definitions/${definition_id}`);
  await dispatch(setJobDefinition(res.data));
  return res.data;
};

export const addJobDefinition = data => async dispatch => {
  try {
    await dispatch(setLoading(true));
    const res = await postData('/job_definitions/create', data);
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));

    throw err;
  }
};

export const editJobDefinition = (data, id) => async dispatch => {
  try {
    await dispatch(setLoading(true));
    await postData(`/job_definitions/${id}/update`, data);
    await dispatch(setLoading(false));
  } catch (err) {
    dispatch(handleError(err, data));
    await dispatch(setLoading(false));
    throw err;
  }
};

export const editDefinitionParams = (data, id) => async dispatch => {
  console.log(data);
  try {
    await dispatch(setLoading(true));
    await postData(
      `/job_definitions/${id}/parameters/${Object.keys(data)[0]}/update`,
      data,
    );
    await dispatch(setLoading(false));
  } catch (err) {
    dispatch(handleError(err, data));
    await dispatch(setLoading(false));
    throw err;
  }
};
