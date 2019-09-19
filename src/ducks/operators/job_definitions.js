import { setJobDefinitions } from 'ducks/actions';
import { handleError } from 'ducks/operators/settings';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData } from 'utils/axios';

export const getJobDefinitions = project_id => async dispatch => {
  try {
    const route = `/projects/${project_id}/job_definitions/list`;
    const res = await getData(route);
    const definitions = await normalizeWithUUID(res.data);
    await dispatch(setJobDefinitions(definitions));
    return definitions;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setJobDefinitions([]));
    throw err;
  }
};
