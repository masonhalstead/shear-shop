import {
  setLoading,
  setErrorMessage,
  logoutUser,
  openModal,
  toggleAlertAction,
} from 'ducks/actions';
import * as Sentry from '@sentry/browser';

// export const handleError = err => dispatch => {
//   Sentry.captureException(err);
//   if (err.response && err.response.status === 401) {
//     dispatch(logoutUser());
//   } else {
//     dispatch(toggleAlertAction(true));
//   }
// };

export const handleError = (err, payload = 'empty') => async (
  dispatch,
  getState,
) => {
  let error_message = 'Unhandled Error';

  if (err || false) {
    error_message = 'React TypeError: Contact Cognitiv';
  }

  if ((err || false).error) {
    error_message = JSON.stringify(err.error || 'Error');
  }

  if ((err || false).response || (err || false).message) {
    error_message = JSON.stringify(err.response) || JSON.stringify(err.message);
  }

  if (((err || false).response || false).data) {
    error_message = JSON.stringify(err.response.data);
  }

  if ((((err || false).response || false).data || false).error) {
    error_message = JSON.stringify(err.response.data.error);
  }

  await dispatch(setLoading(false));

  // Preventing 401 status code from being captured by Sentry
  if (((err || false).response || false).status === 401) {
    dispatch(logoutUser());
    return err;
  }

  await dispatch(setErrorMessage({ error_message }));
  // TODO: BUILD A MODAL THAT WILL DISPLAY ERROR
  // await dispatch(openModal({ admin_message: true }));

  const state = getState();
  Sentry.withScope(scope => {
    scope.setExtra('message', error_message);
    scope.setExtra('payload', payload);
    scope.setExtra('username', ((state || false).user || false).email_address);
    Sentry.captureException(err);
  });
  return err;
};
