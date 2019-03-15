import { connect } from 'react-redux';
import { makeSelectUserToken } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import StripeCheckout from './StripeCheckout';

const mapStateToProps = createStructuredSelector({
  userToken: makeSelectUserToken(),
});

export default connect(mapStateToProps)(StripeCheckout);
