import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyled from './config/globalStyled';
import './config/plugins'
import Routers from './routers';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyled/>
    <Routers/>
  </React.StrictMode>,
  document.getElementById('root')
);
