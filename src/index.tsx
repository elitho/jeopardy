import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { colors } from "shared";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: DINOT-Light, sans-serif;
    font-weight: 100;
    color: ${colors.BEKK_SORT};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  h1 {
    font-weight: 100;
  }
  
  h2 {
    font-weight: 100;
  }
  
  h3 {
    font-weight: 100;
  }
  
  a {
    outline: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  * {
    box-sizing: border-box;
  }
  
  #root {
    height: 100%;
    width: 100%;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
