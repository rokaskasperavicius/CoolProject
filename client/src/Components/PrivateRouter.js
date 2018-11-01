import React from 'react';
import Router from './Router';
import { connect } from "react-redux";

const PrivateRouter = ({ history, layout, component, logged_user }) => {
  return (
    <div>
     <Router layout={layout} component={component}/>
    </div>
)};

export default PrivateRouter;