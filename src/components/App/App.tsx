import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { MainPage, TestPage } from 'pages';
import { colors } from 'shared';

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
