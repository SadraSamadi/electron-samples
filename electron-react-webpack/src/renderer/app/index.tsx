import React, {Component, ReactNode} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';

export default class App extends Component {

  public render(): ReactNode {
    return (
      <HashRouter>
        <div className="w-screen h-screen">
          <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route path="/home"/>
          </Switch>
        </div>
      </HashRouter>
    );
  }

}
