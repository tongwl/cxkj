import React, { Component, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Home from '../../routes/Home/';
import Node from '../../routes/Node';
import Disk from '../../routes/Disk';
import StorageVolume from '../../routes/StorageVolume';
import Snapshot from '../../routes/Snapshot';

export default class ContentMain extends Component<any, any> {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/node' component={Node}/>
          <Route exact path='/disk' component={Disk}/>
          <Route exact path='/storageVolume/volume' component={StorageVolume}/>
          <Route exact path='/storageVolume/snapshot' component={Snapshot}/>
          <Redirect exact from='/' to='/home'/>
        </Switch>
      </Fragment>
    );
  }
}