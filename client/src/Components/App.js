import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import Router from './Router';
import PrivateRouter from './PrivateRouter';
import UserLayout from '../Layouts/UserLayout';
import GuestLayout from '../Layouts/GuestLayout';
import Main from './Main';
import Login from './Login';
import NotFound from './404';
import '../App.css';

class App extends Component {
  render() {
    return (
      <Switch>  
        <PrivateRouter exact path='/' layout={UserLayout} component={Main} history={this.props.history} location={this.props.location}/>
        <Router exact path='/login' layout={GuestLayout} component={Login}/>
        <Router exact path='*' layout={GuestLayout} component={NotFound}/>
      </Switch>
    );
  }
}

export default withRouter(App);
