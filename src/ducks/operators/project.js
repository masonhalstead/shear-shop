import { setProject } from 'ducks/actions';
import { getData } from 'utils/axios';
import { handleError } from './settings';

export const getProject = project_id => async dispatch => {
  try {
    const res = await getData(`/projects/${project_id}`);
    await dispatch(setProject(res.data));
    return res.data;
  } catch (err) {
    dispatch(handleError(err, project_id));
    throw err;
  }
};
