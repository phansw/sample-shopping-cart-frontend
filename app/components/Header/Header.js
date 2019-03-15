import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.scss';

const Header = ({ logout, userToken, username }) => {
  let ActionButton = null;
  if (userToken && userToken.length > 0) {
    ActionButton = (
      <Button
        color="inherit"
        onClick={() => logout()}
      >
        Logout ({username.split('@')[0]})
      </Button>
    );
  } else {
    ActionButton = (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    );
  }


  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="grow">
            The Corner Bookstore
          </Typography>
          {ActionButton}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  username: PropTypes.string,
};

Header.defaultProps = {
  userToken: null,
  username: '',
};

export default Header;
