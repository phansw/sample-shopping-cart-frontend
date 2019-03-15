import { fromJS } from 'immutable';

import {
  LOGIN_ATTEMPT,
  LOGIN_FAILURE,
  LOGIN_RESTART,
  LOGIN_SUCCESS,
  LOGIN_STATUS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  user: {
    loginStatus: LOGIN_STATUS.NULL,
    username: null,
    token: null,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return state
        .setIn(['user', 'loginStatus'], LOGIN_STATUS.PENDING);
    case LOGIN_SUCCESS:
      return state
        .setIn(['user', 'loginStatus'], LOGIN_STATUS.SUCCESS)
        .setIn(['user', 'username'], action.username)
        .setIn(['user', 'token'], action.token);
    case LOGIN_FAILURE:
      return state
        .setIn(['user', 'loginStatus'], LOGIN_STATUS.FAILURE);
    case LOGIN_RESTART:
      return state
        .setIn(['user', 'loginStatus'], LOGIN_STATUS.NULL)
        .setIn(['user', 'username'], null)
        .setIn(['user', 'token'], null);
    default:
      return state;
  }
}

export default appReducer;
