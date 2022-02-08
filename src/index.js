import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import "bootstrap/dist/css/bootstrap.css"
import './styles/styles.css';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
