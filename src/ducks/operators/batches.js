import { setBatches, setBatchDefinitions } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData } from 'utils/axios';
import { handleError } from './settings';

export const getBatches = (project_id) => async dispatch => {
  try {
    const route = `/projects/${project_id}/batches/list`;

    const res = await getData(route);
    const batches = await normalizeWithUUID(res.data);
    await dispatch(setBatches(batches));
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
    return batches;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setBatchDefinitions([]));
    throw err;
  }
};
