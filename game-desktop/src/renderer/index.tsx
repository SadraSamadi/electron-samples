import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';

let app = <App/>;
let root = document.getElementById('root');
ReactDOM.render(app, root);
