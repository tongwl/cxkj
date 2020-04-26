import React, { Component } from 'react';
import PrivateRoute from './routes/PrivateRoute/index.js';
import { Route, Switch } from 'react-router-dom';
import Login from './routes/Login/';
import Index from './routes/Index/';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/"  component={Index}/>
    </Switch>
  );
}