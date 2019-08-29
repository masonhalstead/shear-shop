import { SET_LOOKUPS, CLEAR_LOOKUPS } from 'ducks/types';

const initial_state = {
    something: 'hi',
}
export const lookupsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_LOOKUPS:
      return action.payload;
    case CLEAR_LOOKUPS:
      return {};
    default:
      return state;
  }
};
