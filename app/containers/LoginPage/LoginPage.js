import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  updateUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onInputEnter = (e) => {
    if (e.key === 'Enter') {
      const { onLoginAttempt } = this.props;
      const { username, password } = this.state;
      e.preventDefault();
      onLoginAttempt(username, password);
    }
  };

  render() {
    const {
      classes, onLoginAttempt, isLoggedIn,
    } = this.props;
    const { username, password } = this.state;

    if (isLoggedIn) {
      return (<Redirect to="/" />);
    }

    return (
      <main className={classes.main}>
        <Helmet>
          <title>Login</title>
          <meta
            name="description"
            content="Step in to your local corner bookstore"
          />
        </Helmet>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => this.updateUsername(e)}
                onKeyPress={this.onInputEnter}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => this.updatePassword(e)}
                onKeyPress={this.onInputEnter}
              />
            </FormControl>
            {/*<FormControlLabel*/}
            {/*control={<Checkbox value="remember" color="primary" />}*/}
            {/*label="Remember me"*/}
            {/*/>*/}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                onLoginAttempt(username, password);
              }}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onLoginAttempt: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(LoginPage);
