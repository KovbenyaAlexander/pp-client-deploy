import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Route, useHistory, useParams,
} from 'react-router';
import { userJoin } from '../../store/thunk';
import { IStore } from '../../types';
import Lobby from '../lobby/lobby';

export default function LobbyPrivateRoute(): JSX.Element {
  const { loading, game } = useSelector((state: IStore) => state);
  const { gameID } = useParams<{ gameID: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(userJoin(gameID));
  }, []);

  function NoNesting() {
    if (loading) {
      return (<></>);
    }
    if (game.id) {
      if (game.isActive && !game.isCompleted) {
        history.push(`/game/${gameID}`);
      }
      if (game.isCompleted) history.push(`/result/${gameID}`);
      return <Lobby />;
    }

    return <Redirect to="/" />;
  }

  return (
    <Route path="/lobby/:id">{NoNesting()}</Route>
  );
}
