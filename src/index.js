import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'scss/index.scss';
import store from './store';
import { App } from './App';

global.store = store;

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );

render(App);
