import {
  setLoading,
  setJobDefinition,
  clearJobDefinition,
} from 'ducks/actions';
import { getParameters } from 'ducks/operators/parameters';
import { getProject } from 'ducks/operators/project';
import { normalizeDefinition } from 'utils/normalizers';
import { handleError } from 'ducks/operators/settings';
import { getData, postData } from 'utils/axios';

export const getDefinitionConfig = (
  project_id,
  definition_id,
) => async dispatch => {

  const definition_route = `/job_definitions/${definition_id}`;

  const [definition, parameters] = await Promise.all([
    dispatch(getDefinition(definition_id)),
    dispatch(getParameters(definition_route)),
    dispatch(getProject(project_id)),
  ]);
  return {
    definition,
    parameters,
  };
  // const definition_route = `/job_definitions/${definition_id}`;
  // await dispatch(getParameters(definition_route));
  // const res = await dispatch(getDefinition(definition_id));
  // return res.data;
};

export const getDefinition = definition_id => async dispatch => {
  const res = await getData(`/job_definitions/${definition_id}`);
  const definition = normalizeDefinition(res.data);
  await dispatch(setJobDefinition(definition));
  return definition;
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

export const editDefinition = (data, definition_id) => async dispatch => {
  try {
    await postData(`/job_definitions/${definition_id}/update`, data);
    await dispatch(clearJobDefinition());
  } catch (err) {
    dispatch(handleError(err, data));
    throw err;
  }
};

export const deleteDefinitionParams = (
  definition_id,
  parameter,
) => async () => {
  await getData(
    `/job_definitions/${definition_id}/parameters/${parameter}/delete`,
  );
};
