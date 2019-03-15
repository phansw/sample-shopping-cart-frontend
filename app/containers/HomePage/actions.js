import {
  GET_ITEMS_FROM_SERVER,
  SET_ITEMS,
  SET_ITEM_LOADING_STATUS,
} from './constants';

export function getItemsFromServer(token) {
  return {
    type: GET_ITEMS_FROM_SERVER,
    token,
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
