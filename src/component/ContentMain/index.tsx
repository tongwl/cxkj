import React, { Component, Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute/index.js';
import Home from '../../routes/Home/';
import Node from '../../routes/Node';

export default class ContentMain extends Component<any, any> {
  render() {
    return (
      <Fragment>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>
          <PrivateRoute exact path='/node' component={Node}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </Fragment>
    );
  }
}