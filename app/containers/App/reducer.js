/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN_ATTEMPT,
  LOGIN_FAILURE,
  LOGIN_RESTART,
  LOGIN_SUCCESS,
  LOGIN_STATUS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  user: {
    loginStatus: LOGIN_STATUS.NULL,
    username: null,
    token: null,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
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
