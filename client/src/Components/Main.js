import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { renderField }from './Input';
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { required } from './Validation';

class Main extends React.Component {
  render() {
    return (
      <div className="">
        <Form className="" onSubmit={e => this.onSubmit(e)}>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Height (cm)</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Field
                    name="name"
                    component={renderField}
                    validate={required}
                    placeholder="Enter Name Here"
                    autoComplete="name"
                    transparent
                  />
                </td>
                <td>
                  <Field
                    name="lastname"
                    component={renderField}
                    validate={required}
                    placeholder="Enter Last Name Here"
                    autoComplete="lastname"
                    transparent
                  />
                </td>
                <td>
                  <Field
                    name="age"
                    component={renderField}
                    validate={required}
                    placeholder="Enter Age Here"
                    autoComplete="age"
                    disabled
                    transparent
                  />
                </td>
                <td>
                  <Field
                    name="height"
                    component={renderField}
                    validate={required}
                    placeholder="Enter Height Here"
                    autoComplete="height"
                    disabled
                    transparent
                  />
                </td>
                <td>
                  <Field
                    name="weight"
                    component={renderField}
                    validate={required}
                    placeholder="Enter Weight Here"
                    autoComplete="weight"
                    transparent
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('table')(state),
  formErrors: getFormSyncErrors('table')(state),
});

const formConfig = {
  form: 'table',
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(Main)));
