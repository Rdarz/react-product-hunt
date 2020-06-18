import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/main.scss';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import { hot } from 'react-hot-loader/root';
import './style/main.scss';
const history = createBrowserHistory();
const render = App =>
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
  );

render(hot(App));
