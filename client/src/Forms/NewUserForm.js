import React from 'react'
import { Button } from 'semantic-ui-react'
import { renderField }from '../Inputs/Input'
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { sendUser } from '../Actions/Actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { required } from '../Components/Validation'
import { userUPDATE } from '../API/API'
import { NotificationManager } from 'react-notifications'
import { timeout } from '../Constants/Constants'

class NewUserForm extends React.Component {
  onUserUpdate = () => {
    const values = this.props.formValues;

    return userUPDATE(values).then(() => {
      NotificationManager.success('User has been updated!', '', timeout);
      this.props.sendUser(values);
      this.props.onClose();
    });
  }

  render() {
    const { formErrors, submitting, handleSubmit } = this.props;

    return (
      <section className="app">
        <div className="text">Welcome! Here you can change your data</div>
        <Form onSubmit={handleSubmit(() => this.onUserUpdate())}>
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
            name="username"
            component={renderField}
            validate={required}
            label="User Name"
            placeholder="Enter User Name Here"
            autoComplete="username"
            transparent
          />
          <Button
            content="Submit"
            loading={submitting}
            disabled={Object.keys(formErrors).length !== 0 || submitting}
          />
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('newUserData')(state),
  formErrors: getFormSyncErrors('newUserData')(state),
  user: state.state.user,
  initialValues: {
    id: state.state.user.id,
    name: state.state.user.name,
    lastname: state.state.user.lastname,
    password: state.state.user.password,
    username: state.state.user.username,
    role: state.state.user.role,
    firstime: 'false'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    sendUser: user => dispatch(sendUser(user))
  };
};

const formConfig = {
  form: 'newUserData',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(NewUserForm)));
