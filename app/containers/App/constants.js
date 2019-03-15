/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const ROOT_URL = 'http://localhost:3030';

export const LOGIN_ATTEMPT = 'tcb/App/LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'tcb/App/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'tcb/App/LOGIN_FAILURE';
export const LOGIN_RESTART = 'tcb/App/LOGIN_RESTART';
export const LOGIN_STATUS = {
  PENDING: 'tcb/App/LOGIN_STATUS/PENDING',
  SUCCESS: 'tcb/App/LOGIN_STATUS/SUCCESS',
  FAILURE: 'tcb/App/LOGIN_STATUS/FAILURE',
  NULL: 'tcb/App/LOGIN_STATUS/NULL',
};
