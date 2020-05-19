import React, { Component, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from '../../routes/PrivateRoute/index.js';
import Home from '../../routes/Home/';
import Node from '../../routes/Node';

export default class ContentMain extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/node' component={Node}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </Fragment>
    );
  }
}