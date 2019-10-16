import { setJobDefinitions } from 'ducks/actions';
import { getProject } from 'ducks/operators/project';
import { handleError } from 'ducks/operators/settings';
import { normalizeDefinitions } from 'utils/normalizers';
import { getData } from 'utils/axios';

const filters_map = {
  archived: true,
  unarchived: false,
};
export const getDefinitionsConfig = (project_id, filter) => async dispatch => {
  const [definitions] = await Promise.all([
    dispatch(getDefinitions(project_id, filters_map[filter])),
    dispatch(getProject(project_id)),
  ]);
  return definitions;
};

export const getDefinitions = (
  project_id,
  filter = false,
) => async dispatch => {
  try {
    const route = `/projects/${project_id}/job_definitions/list`;
    const res = await getData(route);
    const definitions = await normalizeDefinitions(res.data, filter);
    await dispatch(setJobDefinitions(definitions));
    return definitions;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setJobDefinitions([]));
    throw err;
  }
};
