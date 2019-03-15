import {
  LOGIN_ATTEMPT,
  LOGIN_FAILURE,
  LOGIN_RESTART,
  LOGIN_SUCCESS,
} from './constants';

export function loginAttempt(username, password) {
  return {
    type: LOGIN_ATTEMPT,
    username,
    password,
  };
}

export function loginSuccess(username, token) {
  return {
    type: LOGIN_SUCCESS,
    username,
    token,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function loginRestart() {
  return {
    type: LOGIN_RESTART,
  };
}
