import { fromJS } from 'immutable';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ROOT_URL } from 'containers/App/constants';
import request from 'utils/request';
import { GET_ITEMS_FROM_SERVER } from './constants';
import { setItems, setItemLoadingStatus } from './actions';

export function* getItemsFromServer({ token }) {
  yield put(setItemLoadingStatus(true));

  const requestUrl = `${ROOT_URL}/inventory`;

  try {
    const { data } = yield call(request, requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    yield put(setItemLoadingStatus(false));

    if (data) yield put(setItems(fromJS(data)));
    else yield put(setItems(fromJS([])));
  } catch (e) {
    yield put(setItemLoadingStatus(false));
    yield put(setItems(fromJS([])));
  }
}

export default function* githubData() {
  yield takeLatest(GET_ITEMS_FROM_SERVER, getItemsFromServer);
}
