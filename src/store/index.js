import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import allreducers from '../reducers'
import {saveToLocalStorage,loadFromLocalStorage} from '../localStorage'


const preloadedState = loadFromLocalStorage();


const store = configureStore({reducer:allreducers, preloadedState, middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)})



store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;