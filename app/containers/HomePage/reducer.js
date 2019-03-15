import { fromJS } from 'immutable';
import {
  GET_ITEMS_FROM_SERVER,
  SET_ITEMS,
  SET_ITEM_LOADING_STATUS,
  CART_ADD_ITEM_SINGLE,
  CART_REMOVE_ITEM_SINGLE,
  CART_CLEAR,
} from './constants';

const initialState = fromJS({
  inventory: {
    items: [],
    isLoading: false,
  },
  cart: {
    items: [],
  },
});

function cartAddItemSingleReducer(state, itemId) {
  const inventoryItems = state.getIn(['inventory', 'items']);
  const cartItems = state.getIn(['cart', 'items']);

  const inventoryItem = inventoryItems.find((item) => item.get('_id') === itemId);
  if (inventoryItem === undefined) return state;

  const cartItemIndex = cartItems.findIndex((item) => item.get('_id') === itemId);

  if (cartItemIndex === -1) {
    if (inventoryItem.get('qty') === 0) return state;

    const newCartItems = cartItems.push(inventoryItem.set('qty', 1));
    return state.setIn(['cart', 'items'], newCartItems);
  }

  const cartItem = cartItems.get(cartItemIndex);
  if (cartItem.get('qty') === inventoryItem.get('qty')) return state;

  const nextQty = cartItem.get('qty') + 1;
  const newCartItem = cartItem.set('qty', nextQty);
  const newCartItems = cartItems.set(cartItemIndex, newCartItem);
  return state.setIn(['cart', 'items'], newCartItems);
}

function cartRemoveItemSingleReducer(state, itemId) {
  const cartItems = state.getIn(['cart', 'items']);
  const cartItemIndex = cartItems.findIndex((item) => item.get('_id') === itemId);

  if (cartItemIndex === -1) return state;

  const cartItem = cartItems.get(cartItemIndex);

  if (cartItem.get('qty') === 1) {
    return state.setIn(['cart', 'items'], cartItems.filter((item) => item.get('_id') !== itemId));
  }

  const nextQty = cartItem.get('qty') - 1;
  const newCartItem = cartItem.set('qty', nextQty);
  const newCartItems = cartItems.set(cartItemIndex, newCartItem);
  return state.setIn(['cart', 'items'], newCartItems);
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_FROM_SERVER:
      return state;
    case SET_ITEMS:
      return state.setIn(['inventory', 'items'], action.items);
    case SET_ITEM_LOADING_STATUS:
      return state.setIn(['inventory', 'isLoading'], action.isLoading);
    case CART_ADD_ITEM_SINGLE:
      return cartAddItemSingleReducer(state, action.itemId);
    case CART_REMOVE_ITEM_SINGLE:
      return cartRemoveItemSingleReducer(state, action.itemId);
    case CART_CLEAR:
      return state.setIn(['cart', 'items'], fromJS([]));
    default:
      return state;
  }
}

export default homeReducer;
