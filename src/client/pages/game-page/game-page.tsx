import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/chat/chat';
import GameStories from '../../components/game-stories/game-stories';

import './style.scss';

export default function GamePage(): JSX.Element {
  const { user } = useSelector((store: any) => store);

  return (
    <article className="game">
      <Chat />
      <GameStories />
      <hr />
      <h2 className="game__title">There are all your games</h2>
      <p>{window.location.hash}</p>
      <p>{`first name: ${user.name}`}</p>
      {user.lastName && (
        <p>{`last name: ${user.lastName}`}</p>
      )}
      <p>
        job position
        {user.jobPosition}
      </p>
      {user.photoUser && (
        <img
          alt=""
          src={user.photoUser}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50px',
          }}
        />
      )}
    </article>
  );
}
