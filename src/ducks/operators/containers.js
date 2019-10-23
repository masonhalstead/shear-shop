import { setContainers } from 'ducks/actions';
import { getData } from 'utils/axios';
import { handleError } from './settings';

export const getContainers = job_id => async dispatch => {
  try {
    const res = await getData(`/jobs/${job_id}/containers/current`);
    await dispatch(setContainers(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleError(err, job_id));

    throw err;
  }
};
