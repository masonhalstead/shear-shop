import { setProjects, setProject } from 'ducks/actions';
import { handleError } from 'ducks/operators/settings';
import { normalizeWithUUID } from 'utils/normalizers';
import { getData, postData } from 'utils/axios';

export const getProjects = () => async dispatch => {
  try {
    const res = await getData('/projects/list');
    const projects = await normalizeWithUUID(res.data);
    await dispatch(setProjects(projects));
    await dispatch(setProject(projects[0]));
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
    return res.data;
  } catch (err) {
    dispatch(handleError(err, data));
    throw err;
  }
};
