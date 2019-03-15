import { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { ROOT_URL } from 'containers/App/constants';

class StripeCheckout extends Component {
  static loadStripe(onLoad) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script');
      script.onload = function stripeScriptOnLoad() {
        onLoad();
      };
      script.src = 'https://checkout.stripe.com/checkout.js';
      document.head.appendChild(script);
    } else {
      onLoad();
    }
  }

  state = {
    isOpen: false,
  };

  componentDidMount() {
    const { onClose } = this.props;

    StripeCheckout.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: 'pk_test_O4SUDMUUGhwlD98HSLemUhXs',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: (stripeToken) => {
          this.createOrder(stripeToken);
        },
        closed: onClose,
      });
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return { isOpen: nextProps.isOpen };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (prevState.isOpen !== isOpen && isOpen) {
      this.onStripeUpdate();
    }
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close();
    }
  }

  onStripeUpdate = () => {
    const { amount } = this.props;
    this.stripeHandler.open({
      name: 'The Corner Bookstore',
      description: 'Complete your purchase!',
      currency: 'sgd',
      amount,
      allowRememberMe: false,
    });
  };

  createOrder(stripeToken) {
    const { cartItems, amount, userToken } = this.props;

    const requestUrl = `${ROOT_URL}/orders`;
    const body = {
      items: cartItems,
      amount,
      stripeToken: stripeToken.id,
      Authorization: userToken,
    };

    return request(requestUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });
  }

  render() {
    return null;
  }
}

StripeCheckout.propTypes = {
  cartItems: PropTypes.array,
  userToken: PropTypes.string.isRequired,
  amount: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

StripeCheckout.defaultProps = {
  cartItems: [],
  amount: 0,
};

export default StripeCheckout;
