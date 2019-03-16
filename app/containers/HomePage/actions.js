import {
  GET_ITEMS_FROM_SERVER,
  SET_ITEMS,
  SET_ITEM_LOADING_STATUS,
  CART_ADD_ITEM_SINGLE,
  CART_REMOVE_ITEM_SINGLE,
  CART_REMOVE_ITEM_ALL,
  CART_CLEAR,
} from './constants';

export function getItemsFromServer(token, shouldShowLoader = true) {
  return {
    type: GET_ITEMS_FROM_SERVER,
    token,
    shouldShowLoader,
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  };
}

export function setItemLoadingStatus(isLoading) {
  return {
    type: SET_ITEM_LOADING_STATUS,
    isLoading,
  };
}

export function cartAddItemSingle(itemId) {
  return {
    type: CART_ADD_ITEM_SINGLE,
    itemId,
  };
}

export function cartRemoveItemSingle(itemId) {
  return {
    type: CART_REMOVE_ITEM_SINGLE,
    itemId,
  };
}

export function cartRemoveItemAll(itemId) {
  return {
    type: CART_REMOVE_ITEM_ALL,
    itemId,
  };
}

export function cartClear() {
  return {
    type: CART_CLEAR,
  };
}
