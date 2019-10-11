import { setProject } from 'ducks/actions';
import { getData } from 'utils/axios';

export const getProject = project_id => async dispatch => {
  const res = await getData(`/projects/${project_id}`);
  await dispatch(setProject(res.data));
  return res.data;
};
