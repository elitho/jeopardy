import '@bekk/storybook/build/lib/fonts/webfonts.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { App } from 'components';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { colors } from 'shared';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: var(--din-light);
    font-weight: 100;
    color: ${colors.BEKK_SORT};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    overflow: hidden;
    --din-light: 'FFDINWebProLight', sans-serif;
    --din-italic: 'DINW01LightItalic', sans-serif;
    --din-regular: 'DINW01Regular', sans-serif;
    --din-medium: 'DINW01Medium', sans-serif;
    --newzald: 'NewZaldBook', serif;
    --small: 8px;
    --regular: 16px;
    --medium: 32px;
    --big: 64px;
  }
  
  h1, h2, h3 {
    font-family: var(--newzald);
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
    <GlobalStyle/>
    <BrowserRouter>
      <HelmetProvider>
        <RecoilRoot>
          <App/>
        </RecoilRoot>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
