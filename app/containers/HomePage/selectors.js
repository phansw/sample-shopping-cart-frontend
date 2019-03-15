import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectInventoryItems = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['inventory', 'items']),
);

const makeSelectInventoryIsLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['inventory', 'isLoading']),
);

const makeSelectCartItems = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['cart', 'items']),
);

export {
  selectHome,
  makeSelectInventoryItems,
  makeSelectInventoryIsLoading,
  makeSelectCartItems,
};
