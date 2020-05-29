import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './routes/Login/';
import Index from './routes/Index/';
import './App.css';

export default () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/"  component={Index}/>
    </Switch>
  );
}
