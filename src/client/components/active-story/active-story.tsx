import React from 'react';
import { useSelector } from 'react-redux';

import { IStory, IStore } from '../../types';
import './style.scss';

export default function ActiveStory(): JSX.Element {
  const game = useSelector((state:IStore) => state.game);

  const { stories } = game.settings;

  const activeStory = stories.find((story: IStory) => story.isActive);

  if (activeStory) {
    return (
      <div className="active-story">
        <h3 className="active-story__title">Active story</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{activeStory.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{activeStory.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="active-story">
      <h3 className="active-story__title">No chosen story</h3>
    </div>
  );
}
