export function selectIsAuthenticated(state) {
  return state.user && state.user.private_key && state.user.public_key;
}
export function selectUser(state) {
  return state.user;
}
