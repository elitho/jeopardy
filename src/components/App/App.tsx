import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'shared';
import { MainPage, TestPage } from 'pages';

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: ${colors.BAKGRUNN};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const App = () => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path={'/'}>
          <MainPage />
        </Route>
        <Route path={'/test'}>
          <TestPage />
        </Route>
      </Switch>
    </AppContainer>
  );
};
