import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyled from './config/globalStyled';
import './config/plugins'
import Routers from './routers';
import {Provider} from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyled/>
    <Routers/>
  </Provider>,
  document.getElementById('root')
);
