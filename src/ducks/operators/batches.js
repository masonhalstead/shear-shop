import { setBatches, setBatchDefinitions } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData } from 'utils/axios';
import { handleError } from './settings';
import { getProject } from './project';

export const getBatches = (project_id) => async dispatch => {
  try {
    const route = `/projects/${project_id}/batches/list`;

    const res = await getData(route);
    const batches = await normalizeWithUUID(res.data);
    await dispatch(setBatches(batches));
    await dispatch(getProject(project_id));

    return batches;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setBatches([]));
    throw err;
  }
};

export const getBatchDefinitions = (project_id) => async dispatch => {
  try {
    const route = `/projects/${project_id}/batch_definitions/list`;

    const res = await getData(route);
    const batches = await normalizeWithUUID(res.data);
    await dispatch(setBatchDefinitions(batches));
    await dispatch(getProject(project_id));
    return batches;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setBatchDefinitions([]));
    throw err;
  }
};
