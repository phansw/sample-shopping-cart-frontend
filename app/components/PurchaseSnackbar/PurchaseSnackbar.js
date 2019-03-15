import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';

const PurchaseSnackbar = ({ open, isSuccess, classes }) => {
  const message = isSuccess
    ? 'Purchase complete' : 'Error purchasing. Please try again.';

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <SnackbarContent
        className={isSuccess ? classes.success : classes.error}
        message={<span id="message-id" className={classes.message}>{message}</span>}
      />
    </Snackbar>
  );
};

const styles = () => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[500],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

PurchaseSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PurchaseSnackbar);
