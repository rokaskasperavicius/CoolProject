import React from 'react'
import { Button } from 'semantic-ui-react'
import { renderField }from './Input'
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { required } from './Validation'
import { userPOST } from '../API/API'
import { NotificationManager } from 'react-notifications'
import { timeout } from '../Constants/Constants'

class AddUserForm extends React.Component {
  onUserPost = () => {
    const values = this.props.formValues;

    return userPOST(values).then(() => {
      NotificationManager.success('User has been added!', '', timeout);
      this.props.onClose();
    });
  }

  render() {
    const { formErrors, submitting, handleSubmit } = this.props;

    return (
      <section className="app">
        <div className="text--modal">Add new user</div>
        <Form onSubmit={handleSubmit(() => this.onUserPost())}>
          <Field
            name="name"
            component={renderField}
            validate={required}
            label="Name"
            placeholder="Enter Name Here"
            autoComplete="name"
            transparent
          />
          <Field
            name="lastname"
            component={renderField}
            validate={required}
            label="Last Name"
            placeholder="Enter Last Name Here"
            autoComplete="lastname"
            transparent
          />
          <Field
            name="password"
            component={renderField}
            validate={required}
            label="Password"
            placeholder="Enter Password Here"
            autoComplete="passwortd"
            transparent
          />
          <Field
            name="role"
            component={renderField}
            validate={required}
            label="Role"
            placeholder="Enter Role Here"
            autoComplete="role"
            transparent
          />
          <Field
            name="username"
            component={renderField}
            validate={required}
            label="User Name"
            placeholder="Enter User Name Here"
            autoComplete="username"
            transparent
          />
          <Button
            content='Submit'
            loading={submitting}
            disabled={Object.keys(formErrors).length !== 0 || submitting}
          />
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('userData')(state),
  formErrors: getFormSyncErrors('userData')(state),
  user: state.state.user
});

const formConfig = {
  form: 'userData',
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(AddUserForm)));
