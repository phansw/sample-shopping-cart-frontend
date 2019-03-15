import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserToken, makeSelectUsername } from 'containers/App/selectors';
import { loginRestart } from 'containers/App/actions';
import Header from './Header';

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(loginRestart()),
});

const mapStateToProps = createStructuredSelector({
  userToken: makeSelectUserToken(),
  username: makeSelectUsername(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
