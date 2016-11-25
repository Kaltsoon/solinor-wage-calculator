import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';

import axiosClient from 'helpers/axios-client';
import reducer from './reducer';

export default createStore(
  reducer,
  applyMiddleware(thunk, axiosMiddleware(axiosClient)),
);
