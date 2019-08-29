import { setLoading, setBatches } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
// import { getData } from 'utils/axios';

const batches_data = [];

export const getBatches = () => async dispatch => {
  await dispatch(setLoading(true));
  // const res = await getData(`/batches`);
  const batches = await normalizeWithUUID(batches_data);
  await dispatch(setBatches(batches));
  return batches;
};
