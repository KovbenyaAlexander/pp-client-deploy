import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IStore, IStory } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import { updateSettings } from '../../store/thunk';
import ActiveStory from '../active-story/active-story';

import './style.scss';

export default function GameStories(): JSX.Element {
  const dispatch = useDispatch();
  const game = useSelector((state:IStore) => state.game);
  const user = useSelector((state:IStore) => state.user);
  const socket = useSelector((state: IStore) => state.socket);
  const { settings } = game;
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);

  const addStoryHandler = () => {
    setShouldShowPopupForAdd(true);
  };

  const onPopupSubmit = (newStory: IStory) => {
    setShouldShowPopupForAdd(false);
    const id = uuidv4();
    socket?.addStory({ ...newStory, id });
    // dispatch(updateSettings({
    //   ...game,
    //   settings: { ...settings, stories: [...settings.stories, { ...newStory, id }] },
    // }));
  };

  const chooseStoryHandler = (activeStory: IStory) => {
    const newStories = game.settings.stories.map((story: IStory) => {
      if (story.id === activeStory.id) {
        return {
          ...activeStory,
          isActive: true,
        };
      }
      return {
        ...story,
        isActive: false,
      };
    });
    socket?.setStory(activeStory.id);
    // dispatch(updateSettings({ ...game, settings: { ...settings, stories: newStories } }));
  };

  return (
    <div className="game__stories">
      <div className="game__stories__header">
        <h3 className="game__stories__title">Stories</h3>
        {user.role === 'dealer' && (
          <button
            className="button button_red button_medium"
            type="button"
            onClick={addStoryHandler}
          >
            Add
          </button>
        )}
      </div>
      <ActiveStory />
      {game.settings.stories.map((story: IStory) => (
        story.isActive ? (<div key={story.id} />) : (
          <table className="game-story" key={story.id}>
            <tbody>
              <tr className="game-story__name story-name">
                <td className="story-name__title">Name</td>
                <td className="story-name__name">{story.name}</td>
              </tr>
              {story.isCompleted ? (
                <tr className="story-estimation">
                  <td><img width="50" src="./battery-100.png" alt="unfinished" /></td>
                  <td className="story-estimation__estimation">{story.estimation}</td>
                </tr>
              ) : <></> }
              {user.role === 'dealer' && !game.isRoundActive && !story.estimation && (
                <tr>
                  <td><img width="50" src="./battery-0.png" alt="unfinished" /></td>
                  <td>
                    <button
                      className="button button_red button_medium"
                      type="button"
                      onClick={() => chooseStoryHandler(story)}
                    >
                      Choose
                    </button>
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        )
      ))}

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
        />
      )}
    </div>
  );
}
