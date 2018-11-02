import React from 'react';
import Router from './Router';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import { timeout } from '../Constants/Constants';

const PrivateRouter = ({ history, layout, component, token }) => {
  return (
    <div>
      {token && document.cookie.includes(`token=${token}`) ?
        <Router layout={layout} component={component}/> : Redirect(history)
      }
    </div>
)};

const Redirect = history => {
  localStorage.setItem('Session Timeout', timeout);
  history.push('/login');
};

const mapStateToProps = state => {
  return { token: state.state.token };
};

export default connect(mapStateToProps)(PrivateRouter);