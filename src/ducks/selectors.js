export function selectIsAuthenticated(state) {
  if (state.user && state.user.private_key && state.user.public_key) {
    return true;
  }
  return false;
}
export function selectUser(state) {
  return state.user;
}

export function selectLoading(state) {
  return state.loading;
}

export function selectAlert(state) {
  return state.settings.alert;
}
