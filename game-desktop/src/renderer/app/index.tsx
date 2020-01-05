import React, {Component, ReactNode} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import Screen from './components/screen';

export default class App extends Component {

  public render(): ReactNode {
    return (
      <HashRouter>
        <div className="w-screen h-screen">
          <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route path="/home" component={Home}/>
            <Route path="/screen" component={Screen}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }

}
