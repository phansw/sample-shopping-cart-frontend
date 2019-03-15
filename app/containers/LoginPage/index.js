import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUsername,
  makeSelectUserToken,
  makeSelectIsUserLoggingIn,
  makeSelectIsUserLoggedIn,
  makeSelectIsUserLoginFail,
  makeSelectIsUserNotLoggedIn,
} from 'containers/App/selectors';
import { loginAttempt, loginRestart } from 'containers/App/actions';
import LoginPage from 'containers/LoginPage/LoginPage';

const mapDispatchToProps = (dispatch) => ({
  onLoginAttempt: (username, password) => {
    dispatch(loginRestart());
    dispatch(loginAttempt(username, password));
  }
});

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  userToken: makeSelectUserToken(),
  isLoggingIn: makeSelectIsUserLoggingIn(),
  isLoggedIn: makeSelectIsUserLoggedIn(),
  isLoginFail: makeSelectIsUserLoginFail(),
  isNotLoggedIn: makeSelectIsUserNotLoggedIn(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
