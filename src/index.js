import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyled from './config/globalStyled';
import Home from './views/home';
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyled/>
    <Home/>
  </React.StrictMode>,
  document.getElementById('root')
);
