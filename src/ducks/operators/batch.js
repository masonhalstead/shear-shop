import { setLoading, setBatch } from 'ducks/actions';
import { normalizeWithUUID } from 'utils/normalizers';
// import { getData } from 'utils/axios';

const batch_data = [];

export const getBatch = batch_id => async dispatch => {
  await dispatch(setLoading(true));
  // const res = await getData(`/batches/${batch_id}`);
  const batch = await normalizeWithUUID(batch_data);
  await dispatch(setBatch(batch));
  return batch;
};
