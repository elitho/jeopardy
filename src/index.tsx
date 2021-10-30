import '@bekk/storybook/build/lib/fonts/webfonts.css';
import '@bekk/storybook/build/lib/constants/styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { App } from 'components';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
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
