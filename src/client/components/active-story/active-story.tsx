import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IStory, IStore } from '../../types';
import './style.scss';

export default function ActiveStory(): JSX.Element {
  const game = useSelector((state:IStore) => state.game);

  const { stories } = game.settings;

  const activeStory = stories.find((story: IStory) => story.isActive);

  if (activeStory) {
    return (
      <div className="active-story">
        <h3>Active story</h3>
        <p>
          name:
          {activeStory.name}
        </p>
        <p>
          description:
          {activeStory.description}
        </p>
        <hr />
      </div>
    );
  }

  return (
    <>
      <p className="active-story">no active story</p>
      <hr />
    </>
  );
}
