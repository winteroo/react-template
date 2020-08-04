import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './store/root';
import App from './App';

// jsx语法中,组件大写字母开头
ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>
  , document.getElementById('root'));
