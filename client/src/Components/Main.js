import React from 'react'
import Modals from './Modals'
import AddUserForm from '../Forms/AddUserForm'
import NewUserForm from '../Forms/NewUserForm'
import { Button, Table } from 'semantic-ui-react'
import { renderField } from '../Inputs/Input'
import { Field, reduxForm, getFormValues, getFormSyncErrors, Form } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { required } from './Validation'
import { data, dataPOST } from '../API/API'
import { initialize } from 'redux-form'
import { NotificationManager } from 'react-notifications'
import { timeout, userAdd, userFirstime } from '../Constants/Constants'

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

  onDataPost = () => {
    const values = this.props.formValues;

    this.onModalClose();
    return dataPOST(values).then(() => {
      this.onUpdateData(values);
      NotificationManager.success('Table has been updated!', '', timeout);
    });
  }

  render() {
    const role = this.props.user.role[0];
    const { formErrors, submitting, handleSubmit } = this.props;
    const { open, title, content } = this.state;

    return (
      <section className="app">
        {role === undefined ? <div className="text">Your role is {role}</div> : <div className="text">Your role is {role}</div>}
        <Form onSubmit={handleSubmit(() => this.onDataPost())}>
          <section style={{overflowX: "auto"}}>
            <Table celled unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Age</Table.HeaderCell>
                  <Table.HeaderCell>Height (cm)</Table.HeaderCell>
                  <Table.HeaderCell>Weight (kg)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Field
                      name="name"
                      component={renderField}
                      validate={required}
                      placeholder="Enter Name Here"
                      autoComplete="name"
                      disabled={(role === 'Admin' || role === 'Name') ? false : true}
                      transparent
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Field
                      name="lastname"
                      component={renderField}
                      validate={required}
                      placeholder="Enter Last Name Here"
                      autoComplete="lastname"
                      disabled={(role === 'Admin' || role === 'LastName') ? false : true}
                      transparent
                    />
                  </Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </section>
          {role !== 'Guest' && 
            <Button
              content='Submit'
              loading={submitting}
              disabled={Object.keys(formErrors).length !== 0 || submitting}
            />}

            {role !== 'Guest' &&
            <Button
              content='Reset'
              onClick={e => this.onDataReset(e)}
            />}

            {role === 'Admin' &&
            <Button
              content='Add User'
              style={{ width: "130px" }}
              onClick={e => {
                e.preventDefault() 
                this.onModalOpen(userAdd, AddUserForm)
              }}
            />}
        </Form>
        <Modals
          open={open}
          title={title}
          content={content}
          onClose={() => this.onModalClose()}
        >
        </Modals>
      </section>   
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('tableData')(state),
  formErrors: getFormSyncErrors('tableData')(state),
  user: state.state.user
});

const formConfig = {
  form: 'tableData'
};

export default withRouter(connect(mapStateToProps)(reduxForm(formConfig)(Main)));
