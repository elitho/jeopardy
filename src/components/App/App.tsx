import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";
import { MainPage, TestPage } from "pages";

const AppContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
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
