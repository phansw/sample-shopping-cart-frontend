import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUserToken } from 'containers/App/selectors';
import {
  getItemsFromServer,
  cartAddItemSingle,
  cartRemoveItemSingle,
  cartClear,
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
  getItemsFromServer: (token, shouldShowLoader) => {
    dispatch(getItemsFromServer(token, shouldShowLoader));
  },
  cartAddItemSingle: (itemId) => dispatch(cartAddItemSingle(itemId)),
  cartRemoveItemSingle: (itemId) => dispatch(cartRemoveItemSingle(itemId)),
  cartClear: () => dispatch(cartClear()),
});

const mapStateToProps = createStructuredSelector({
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
