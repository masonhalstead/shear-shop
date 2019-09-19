import { setProjects } from 'ducks/actions';
import { handleError } from 'ducks/operators/settings';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData, postData } from 'utils/axios';

export const getProjects = () => async dispatch => {
  try {
    const res = await getData('/projects/list');
    const projects = await normalizeWithUUID(res.data);
    await dispatch(setProjects(projects));
    return projects;
  } catch (err) {
    dispatch(handleError(err));
    dispatch(setProjects([]));
    throw err;
  }
};

export const addProject = data => async dispatch => {
  try {
    const res = await postData('/projects/create', data);
    // TODO Redirect to project after it has been created
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));
    throw err;
  }
};
