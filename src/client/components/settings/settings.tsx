import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';
import {
  createGame, updateSettings, cancelGame, activitySwitcher,
} from '../../store/thunk';
import { IStore, IStory, ISettings } from '../../types';
import StoryPopup from '../story-popup/story-popup';
import { Stories } from '../settings-stories/settingsStories';

export default function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const game = useSelector((state:IStore) => state.game);
  const [settings, setSettings] = useState(game.settings);
  const [shouldShowPopupForAdd, setShouldShowPopupForAdd] = useState(false);
  const [storyToEdit, setStoryToEdit] = useState<null | IStory>(null);
  const [formValidation, setFormValidation] = useState(false);
  const [storiesValidation, setStoriesValidation] = useState(true);

  // const { id, isActive } = useSelector((state: IStore) => ({
  //   id: state.game.id,
  //   isActive: state.game.isActive,
  // }));

  const onSettingsSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (settings.gameName.length < 4 || settings.gameName.length > 30) {
      setFormValidation(true);
      return;
    }

    if (settings.stories.length === 0) {
      setStoriesValidation(false);
      return;
    }

    if (game.id) {
      dispatch(updateSettings({ ...game, settings }));
    } else {
      dispatch(createGame({ ...game, settings }));
    }
  };

  const onPopupSubmit = (newStory: IStory) => {
    if (!storyToEdit) {
      setSettings((prev: ISettings) => ({ ...prev, stories: [...prev.stories, { ...newStory, id: uuidv4() }] }));
    } else {
      setSettings((prev: ISettings) => {
        const newStories = prev.stories.map((story: IStory) => {
          if (newStory.id === story.id) {
            return newStory;
          }
          return story;
        });

        return { ...prev, stories: newStories };
      });
    }
    setStoryToEdit(null);
    setShouldShowPopupForAdd(false);
    setStoriesValidation(true);
  };

  useEffect(() => {
    if (settings.gameName.length < 4 || settings.gameName.length > 30) {
      setFormValidation(true);
      return;
    }
    if (game.id && history.location.pathname !== `/lobby/${game.id}`) {
      history.push(`/lobby/${game.id}`);
    }
  }, [game.id]);

  useEffect(() => {
    if (settings.gameName.length > 3 || settings.gameName.length < 31) {
      setFormValidation(false);
    }
  }, [settings.gameName]);

  const gameActivitySwitcher = () => {
    if (settings.stories.length === 0) {
      setStoriesValidation(false);
      return;
    }
    dispatch(updateSettings({ ...game, settings }));
    dispatch(activitySwitcher(game.isActive));
    history.push(`/game/${game.id}`);
  };

  return (
    <>
      <form className="settings" onSubmit={onSettingsSubmitHandler}>
        <div className="settings__container">
          <span>Name of game</span>
          <input
            type="text"
            value={settings.gameName}
            onChange={(e) => setSettings({ ...settings, gameName: e.target.value })}
          />
          {formValidation && <span className="settings__validation-error">name length must be more than 3 characters and less than 30</span>}
          <br />

          <span>Dealer in game</span>
          <input
            type="checkbox"
            checked={settings.isDealerInGame}
            onChange={(e) => setSettings({ ...settings, isDealerInGame: e.target.checked })}
          />

          <br />

          <span>Auto entry</span>
          <input
            type="checkbox"
            checked={settings.isAutoEntry}
            onChange={(e) => setSettings({ ...settings, isAutoEntry: e.target.checked })}
          />

          <br />

          <span>Auto finish</span>
          <input
            type="checkbox"
            checked={settings.isAutoFinish}
            onChange={(e) => setSettings({ ...settings, isAutoFinish: e.target.checked })}
          />

          <br />

          <span>Allow change vote</span>
          <input
            type="checkbox"
            checked={settings.isVoteMutable}
            onChange={(e) => setSettings({ ...settings, isVoteMutable: e.target.checked })}
          />

          <br />

          <p>Estimation Type</p>
          <label htmlFor="single">
            Power of number 2
            <input
              type="radio"
              name="Estimation"
              id="PowerOf2"
              checked={settings.estimationType === 'power2'}
              onChange={() => setSettings({ ...settings, estimationType: 'power2' })}
            />
          </label>

          <br />

          <label htmlFor="single">
            Fibonacci numbers
            <input
              type="radio"
              name="Estimation"
              id="Fibonacci"
              checked={settings.estimationType === 'fibonacci'}
              onChange={() => setSettings({ ...settings, estimationType: 'fibonacci' })}

            />
          </label>

          <br />

          <span>Timer </span>
          <input
            type="checkbox"
            checked={settings.isTimerRequired}
            onChange={(e) => setSettings({ ...settings, isTimerRequired: e.target.checked })}

          />
          <br />
          {settings.isTimerRequired
   && (
     <label htmlFor="appt-time">
       Choose time:
       <input
         id="appt-time"
         type="time"
         value={settings.timerValue}
         onChange={(e) => setSettings({ ...settings, timerValue: e.target.value })}
         min="00:10"
         max="99:59"
         required
       />
     </label>
   )}

        </div>
        <Stories
          stories={settings.stories}
          setSettings={setSettings}
          setStoryToEdit={setStoryToEdit}
          setShouldShowPopupForAdd={setShouldShowPopupForAdd}
        />

        <button type="button" onClick={() => setShouldShowPopupForAdd(true)}>Add story</button>
        <br />
        {!storiesValidation && <p className="settings__validation-error">To start the game you must create at least one story</p>}

        {!game.id && <button type="submit">Create game</button>}
        {game.isActive && <button type="submit">Update game</button>}

      </form>

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
          storyToEdit={storyToEdit}
        />
      )}

      {game.id && (
        <button type="button" onClick={gameActivitySwitcher}>
          {game.isActive ? 'Pause game' : 'Start game'}
        </button>
      )}

    </>
  );
}
