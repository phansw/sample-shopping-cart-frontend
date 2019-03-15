import { fromJS } from 'immutable';

import {
  GET_ITEMS_FROM_SERVER,
  SET_ITEMS,
  SET_ITEM_LOADING_STATUS,
} from './constants';

const initialState = fromJS({
  inventory: {
    items: [],
    isLoading: false,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_FROM_SERVER:
      return state;
    case SET_ITEMS:
      return state.setIn(['inventory', 'items'], action.items);
    case SET_ITEM_LOADING_STATUS:
      return state.setIn(['inventory', 'isLoading'], action.isLoading);
    default:
      return state;
  }
}

export default homeReducer;
