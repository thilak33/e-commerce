import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
// import {applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';

import App from './components/App';
// import allreducers from './reducers';
// const store = configureStore({reducer:allreducers}, applyMiddleware(thunk))

import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

