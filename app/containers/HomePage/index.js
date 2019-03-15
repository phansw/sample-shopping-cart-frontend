import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserToken,
} from 'containers/App/selectors';
import {
  getItemsFromServer,
  cartAddItemSingle,
  cartRemoveItemSingle,
} from './actions';
import {
  makeSelectInventoryItems,
  makeSelectInventoryIsLoading,
  makeSelectCartItems,
  makeSelectCartSubtotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  getItemsFromServer: (token) => dispatch(getItemsFromServer(token)),
  cartAddItemSingle: (itemId) => dispatch(cartAddItemSingle(itemId)),
  cartRemoveItemSingle: (itemId) => dispatch(cartRemoveItemSingle(itemId)),
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  userToken: makeSelectUserToken(),
  inventoryItems: makeSelectInventoryItems(),
  isLoadingItems: makeSelectInventoryIsLoading(),
  cartItems: makeSelectCartItems(),
  cartSubtotal: makeSelectCartSubtotal(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
