import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './style.scss';

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className="grow">
              The Corner Bookstore
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
