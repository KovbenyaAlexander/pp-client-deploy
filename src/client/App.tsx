import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import GamePage from './pages/game-page/game-page';
import SettingsPage from './pages/settings-page/settings-page';
import NotFound from './pages/404/404';
import Header from './components/header/header';
import './style.scss';
import LobbyPrivateRoute from './pages/lobby-private-route/lobby-private-route';

const App = (): JSX.Element => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path={['/', '/connect/:gameId']}
          render={(props) => <MainPage {...props} />}
        />

        <Route path="/lobby/:gameID">
          <LobbyPrivateRoute />
        </Route>

        <Route path="/game">
          <GamePage />
        </Route>

        <Route path="/settings">
          <SettingsPage />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
