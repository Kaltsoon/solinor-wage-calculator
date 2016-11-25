import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'components/app';
import store from 'state/store';

try {
  require('babel-polyfill'); // eslint-disable-line global-require
} catch (e) {
  console.log(e); // eslint-disable-line no-console
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
