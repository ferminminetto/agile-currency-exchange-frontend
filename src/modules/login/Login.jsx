import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'react-jss';
import { push } from 'connected-react-router';
import Swal from 'sweetalert2';
import styles from './LoginStyles';
import { attemptUserLogin } from '../../utils/ApiClient';


class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sweetAlertLoginMessage = () => ({
    showCancelButton: false,
    confirmButtonText: 'Continue',
    allowOutsideClick: false
  })

  attemptLogin = async () => {
    const { username, password } = this.state
    const token = await attemptUserLogin(username, password);
    const sweetAlertLoginMessage = this.sweetAlertLoginMessage();
    if (token) {
      await Swal.fire({
        ...sweetAlertLoginMessage,
        title: 'Welcome back!',
        text: 'You just successfully logged in. We are happy to see you again!',
        type: 'success'
      });
      this.props.push('/');
    } else {
      await Swal.fire({
        ...sweetAlertLoginMessage,
        title: 'Error trying to Log In',
        text: 'There has been an error while trying to log in. Please check your credentials or try again later.',
        type: 'error'
      });
    }
  }

  render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainer}>
        <div className={classes.formContainer}>
          <h2 className={classes.loginTitle}> Login </h2>
          <input
            className={classes.loginInput}
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.onInputChange}
          ></input>
          <input
            className={classes.loginInput}
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.onInputChange}
          ></input>
        </div>
        <button className={classes.submitButton} onClick={this.attemptLogin}> Submit </button>
      </div>
    );
  };
}


export default compose(
  withStyles(styles),
  connect(null, { push })
)(Login);