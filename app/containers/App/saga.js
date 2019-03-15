import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_ATTEMPT, ROOT_URL } from 'containers/App/constants';
import { loginSuccess, loginFailure } from 'containers/App/actions';

import request from 'utils/request';

export function* login({ username, password }) {
  const requestURL = `${ROOT_URL}/authentication`;
  const body = {
    strategy: 'local',
    email: username,
    password,
  };

  try {
    const { accessToken } = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (accessToken !== undefined) yield put(loginSuccess(username, accessToken));
    else yield put(loginFailure());
  } catch (err) {
    yield put(loginFailure());
  }
}

export default function* watchLoginAttempt() {
  yield takeLatest(LOGIN_ATTEMPT, login);
}
