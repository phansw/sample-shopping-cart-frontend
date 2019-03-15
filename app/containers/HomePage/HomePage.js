import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LoadingIndicator from 'components/LoadingIndicator';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ItemCard from 'components/ItemCard';
import StripeCheckout from 'containers/StripeCheckout';

class HomePage extends Component {
  state = {
    isCheckingOut: false,
  };

  constructor(props) {
    super(props);
    props.getItemsFromServer(props.userToken);
  }

  render() {
    const {
      classes, inventoryItems, isLoadingItems, cartAddItemSingle, cartRemoveItemSingle,
      cartItems, cartSubtotal, getItemsFromServer, userToken,
    } = this.props;

    const { isCheckingOut } = this.state;

    if (isLoadingItems) {
      return LoadingIndicator();
    }

    const cartItemsObject = {};
    const cartItemsArray = cartItems.toJS();
    cartItemsArray.forEach((item) => {
      const { _id: id } = item;
      cartItemsObject[id] = { ...item };
    });

    const isCartEmpty = cartItems.size === 0;

    // update qty in inventory items to reflect cart qty instead of stock qty
    // map to match props of ItemCard component
    const items = inventoryItems.toJS().map((item) => {
      const { _id: id } = item;
      const cartQty = cartItemsObject[id] === undefined ? 0 : cartItemsObject[id].qty;
      return {
        ...item,
        id,
        cartQty,
        stockQty: item.qty,
        isSoldOut: item.qty === 0,
        image: item.images[0],
      };
    });

    return (
      <React.Fragment>
        <Helmet>
          <title>Home</title>
          <meta
            name="Home Page"
            content="Home Page of The Corner Bookstore"
          />
        </Helmet>
        <CssBaseline />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  onAddItem={() => {
                    cartAddItemSingle(item.id);
                  }}
                  onRemoveItem={() => {
                    cartRemoveItemSingle(item.id);
                  }}
                  {...item}
                />
              ))}
            </Grid>
            <Fab
              aria-label="Check out"
              variant="extended"
              className={classes.checkoutButton}
              disabled={isCartEmpty}
              color="primary"
              onClick={() => {
                this.setState({ isCheckingOut: true });
              }}
            >
              <ShoppingCartIcon style={{ marginRight: 8 }} />
              Checkout
            </Fab>
          </div>
          <StripeCheckout
            isOpen={isCheckingOut}
            onClose={() => {
              this.setState({ isCheckingOut: false });
            }}
            amount={cartSubtotal * 100}
            description={'Complete your purchase!'}
            cartItems={cartItemsArray}
            onSuccess={() => {
              getItemsFromServer(userToken);
            }}
          />
        </main>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  getItemsFromServer: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  inventoryItems: PropTypes.array,
  isLoadingItems: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  cartAddItemSingle: PropTypes.func.isRequired,
  cartRemoveItemSingle: PropTypes.func.isRequired,
  cartItems: PropTypes.array,
};

HomePage.defaultProps = {
  userToken: null,
  inventoryItems: [],
  isLoadingItems: false,
  cartItems: [],
};

const styles = (theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  checkoutButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
});

export default withStyles(styles)(HomePage);
