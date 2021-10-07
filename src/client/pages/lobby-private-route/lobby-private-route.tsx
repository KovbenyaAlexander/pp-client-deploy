import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useParams } from 'react-router';
import { userJoin } from '../../store/thunk';
import { IStore } from '../../types';
import GamePage from '../game-page/game-page';
import Lobby from '../lobby/lobby';

export default function LobbyPrivateRoute(): JSX.Element {
  const { loading, game } = useSelector((state: IStore) => state);
  const { gameID } = useParams<{ gameID: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userJoin(gameID));
  }, []);

  function NoNesting() {
    if (loading) {
      return (<></>);
    }
    if (game.id) {
      return game.isActive ? <GamePage /> : <Lobby />;
    }
    return <Redirect to="/" />;
  }

  return (
    <Route path="/lobby/:id">{NoNesting()}</Route>
  );
}
