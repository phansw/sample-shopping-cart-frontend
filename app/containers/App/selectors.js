/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { LOGIN_STATUS } from './constants';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

/*
  User state selectors
 */
const makeSelectUsername = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'username']),
);

const makeSelectUserToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'token']),
);

const makeSelectIsUserLoggingIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'loginStatus']) === LOGIN_STATUS.PENDING,
);

const makeSelectIsUserLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'loginStatus']) === LOGIN_STATUS.SUCCESS,
);

const makeSelectIsUserLoginFail = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'loginStatus']) === LOGIN_STATUS.FAILURE,
);

const makeSelectIsUserNotLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['user', 'loginStatus']) === LOGIN_STATUS.NULL,
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectUsername,
  makeSelectUserToken,
  makeSelectIsUserLoggingIn,
  makeSelectIsUserLoggedIn,
  makeSelectIsUserLoginFail,
  makeSelectIsUserNotLoggedIn,
};
