import React from 'react'
import Modals from './Modals'
import AddUserForm from './AddUserForm';
import NewUserForm from './NewUserForm';
import { Button } from 'semantic-ui-react'
import { renderField }from './Input'
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { required } from './Validation'
import { data, dataPOST } from '../API/API'
import { initialize } from 'redux-form'
import { NotificationManager } from 'react-notifications'
import { timeout } from '../Constants/Constants'

const userAdd = 'Add new user';
const userFirstime = 'Welcome! Here you can change your data';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      open: false,
      title: '',
      content: undefined
    }
  }

  onModalClose = () => {
    this.setState({ open: false });
  };

  onModalOpen = (title, content) => {
    this.setState({ open: true, title, content });
  };

  componentWillMount() {
    if (this.props.user.firstime === 'true') {
      this.onModalOpen( userFirstime, NewUserForm );
    }
    data().then(data => {
      this.onUpdateData(data[0]);
    });
  }

  onUpdateData = data => {
    this.setState({ data });
    this.props.dispatch(initialize('tableData', data));
  }

  onDataReset = e => {
    const { data } = this.state;
    e.preventDefault();

    this.onUpdateData(data);
    NotificationManager.success('Table has been reset!', '', timeout);
  }

  onDataPOST = () => {
    const values = this.props.formValues;

    this.onModalClose();
    return dataPOST(values).then(() => {
      this.onUpdateData(values);
      NotificationManager.success('Table has been updated!', '', timeout);
    });
  }

  render() {
    const role = this.props.user.role;
    const { formErrors, submitting, handleSubmit } = this.props;
    const { open, title, content } = this.state;

    return (
      <div>
        <section className="app">
          {role === undefined ? <div className="text">Your role is Guest</div> : <div className="text">Your role is {role}</div>}
          
          <Form onSubmit={handleSubmit(() => this.onDataPOST())}>
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
                      disabled={(role === 'Admin' || role === 'Name') ? false : true}
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
                      disabled={(role === 'Admin' || role === 'LastName') ? false : true}
                      transparent
                    />
                  </td>
                  <td>
                    <Field
                      name="age"
                      component={renderField}
                      validate={required}
                      placeholder="Enter Age Here"
                      type="number"
                      autoComplete="age"
                      disabled={(role === 'Admin' || role === 'Age') ? false : true}
                      transparent
                    />
                  </td>
                  <td>
                    <Field
                      name="height"
                      component={renderField}
                      validate={required}
                      placeholder="Enter Height Here"
                      type="number"
                      autoComplete="height"
                      disabled={(role === 'Admin' || role === 'Height') ? false : true}
                      transparent
                    />
                  </td>
                  <td>
                    <Field
                      name="weight"
                      component={renderField}
                      validate={required}
                      placeholder="Enter Weight Here"
                      type="number"
                      autoComplete="weight"
                      disabled={(role === 'Admin' || role === 'Weight') ? false : true}
                      transparent
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {role !== undefined ? 
              <Button
                content='Submit'
                loading={submitting}
                disabled={Object.keys(formErrors).length !== 0 || submitting}
              /> : ''}

              {role !== undefined ?
              <Button
                content='Reset'
                onClick={e => this.onDataReset(e)}
              /> : ''}

              {role === 'Admin' ?
              <Button
                content='Add User'
                style={{ width: "130px" }}
                onClick={e => {
                  e.preventDefault() 
                  this.onModalOpen(userAdd, AddUserForm)
                }}
              /> : ''}
          </Form>
          <Modals
            open={open}
            title={title}
            content={content}
            onClose={() => this.onModalClose()}
          >
          </Modals>
        </section>   
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('tableData')(state),
  formErrors: getFormSyncErrors('tableData')(state),
  user: state.state.user
});

const formConfig = {
  form: 'tableData',
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(Main)));
