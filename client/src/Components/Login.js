import React from 'react';
import { renderField }from './Input';
import { required } from './Validation';
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { timeout } from '../Constants/Constants';
import { login } from '../API/API';
import { NotificationManager } from 'react-notifications';
import { setToken, removeToken } from './Token';
import { sendUser, clear, sendToken } from '../Actions/Actions';

class Login extends React.Component {
  onSubmit = () => {
    const values = this.props.formValues;

    return login(values).then(properties => {
      console.log(properties);
      if (properties.value) {
        NotificationManager.success('You have successfully logged in!', '', timeout);

        this.props.sendUser(properties.value);
        this.props.sendToken(properties.token);
        setToken(properties.token);
        this.props.history.push('/');
      } else {
        NotificationManager.error(properties.error, '', timeout);
      }
    })
  }

  componentWillMount() {
    const error = localStorage.getItem('Session Timeout');
    localStorage.clear();
    if (error)
      NotificationManager.error('Session Timeout', '', error);

    this.props.clear();
    removeToken();
  }

  onLoginGuest = e => {
    e.preventDefault();

    setToken('Guest');
    this.props.sendToken('Guest');

    this.props.history.push('/');
  }

  render() {
    const { formErrors, submitting, handleSubmit } = this.props;
    
    return (
      <div className="app">
        <h2 className="title">
          Login to the Coolest Web Site!
        </h2>
        <Form className="form guest-form" onSubmit={handleSubmit(() => this.onSubmit())}>
          <Field
            name="username"
            label="User Name"
            component={renderField}
            validate={required}
            placeholder="Enter your user name"
            autoComplete="username"
          />
          <Field
            name="password"
            label="Password"
            component={renderField}
            validate={required}
            placeholder="Enter your password"
            type="password"
            autoComplete="password"
          />
          <Button
            content="Login"
            className="login"
            loading={submitting}
            disabled={Object.keys(formErrors).length !== 0 || submitting}
          />
          <Button
            content="Guest"
            className="guest"
            onClick={e => this.onLoginGuest(e)}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('login')(state),
  formErrors: getFormSyncErrors('login')(state),
});

const mapDispatchToProps = dispatch => {
  return {
    sendUser: user => dispatch(sendUser(user)),
    sendToken: token => dispatch(sendToken(token)),
    clear: () => dispatch(clear()),
  };
};

const formConfig = {
  form: 'login',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(Login)));