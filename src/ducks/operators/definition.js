import { setJobDefinition } from 'ducks/actions';
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

  // Needs to fire before definition for run definition modal
  const parameters = await dispatch(getParameters(definition_route));

  const [definition] = await Promise.all([
    dispatch(getDefinition(definition_id)),
    dispatch(getProject(project_id)),
  ]);
  return { definition, parameters };
};

export const getDefinition = definition_id => async dispatch => {
  const res = await getData(`/job_definitions/${definition_id}`);
  const definition = normalizeDefinition(res.data);
  await dispatch(setJobDefinition(definition));
  return definition;
};

export const createDefinition = data => async dispatch => {
  try {
    const res = await postData('/job_definitions/create', data);
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));
    throw err;
  }
};

export const saveDefinition = (definition, parameters) => async dispatch => {
  const { job_definition_id } = definition;

  try {
    await updateDefinition(job_definition_id, definition);
    await updateDefinitionParameters(job_definition_id, parameters.update);
    await deleteDefinitionParameters(job_definition_id, parameters.remove);
    await createDefinitionParameters(job_definition_id, parameters.create);
  } catch (err) {
    dispatch(handleError(err, { definition, parameters }));
  }
};

export const updateDefinition = (definition_id, data) => {
  postData(`/job_definitions/${definition_id}/update`, data);
};

export const updateDefinitionParameters = (definition_id, data) => {
  data.forEach(param => {
    postData(
      `/job_definitions/${definition_id}/parameters/${param.parameter_name_old}/update`,
      param,
    );
  });
};

export const deleteDefinitionParameters = (definition_id, data) => {
  data.forEach(param => {
    getData(
      `/job_definitions/${definition_id}/parameters/${param.parameter_name}/delete`,
    );
  });
};

export const createDefinitionParameters = (definition_id, data) => {
  data.forEach(param => {
    postData(
      `/job_definitions/${definition_id}/parameters/${param.parameter_name}/create`,
      param,
    );
  });
};
