import React from 'react';
import { renderField }from './Input';
import { required } from './Validation';
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { timeout } from '../Constants/Constants';

class Login extends React.Component {

  onSubmit = () => {
    const values = this.props.formValues;

    return fetch('/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(properties => {
      if (properties.id) {
        this.props.history.push('/');
        NotificationManager.success('You have successfully logged in!', '', timeout);
      } else {
        NotificationManager.error(properties, '', timeout);
      }
    })
    .catch(() => {
      NotificationManager.error('Something went wrong! Please try again later', '', timeout);
    })
}

  onLoginGuest = e => {
    e.preventDefault();

    this.props.history.push('/');
  }

  render() {
    const { formErrors, submitting, handleSubmit } = this.props;

    return (
      <div className="app">
        <h2 className="title">
          Login to the Coolest Web Site!
        </h2>
        <Form className="form guest-form" onSubmit={handleSubmit(() => this.onSubmit())} loading={submitting}>
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

const formConfig = {
  form: 'login',
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(Login)));