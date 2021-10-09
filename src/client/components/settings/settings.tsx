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

  function onFileLoad(e: React.ChangeEvent<HTMLInputElement>): void {
    const input = e.target;
    if (input.files) {
      Array(...input.files).forEach((file) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
          if (typeof (fileReader.result) === 'string') {
            const stories = JSON.parse(fileReader.result);
            if (Array.isArray(stories)) {
              stories.forEach((story) => {
                const newStory: IStory = {
                  name: story.name,
                  description: story.description ? story.description : '',
                  isActive: false,
                  isCompleted: false,
                  estimation: null,
                  id: '',
                };
                setSettings((prev: ISettings) => (
                  { ...prev, stories: [...prev.stories, { ...newStory, id: uuidv4() }] }));
              });
              return;
            }
            const newStory: IStory = {
              name: stories.name,
              description: stories.description ? stories.description : '',
              isActive: false,
              isCompleted: false,
              estimation: null,
              id: '',
            };
            setSettings((prev: ISettings) => (
              { ...prev, stories: [...prev.stories, { ...newStory, id: uuidv4() }] }));
          }
        };
      });
    }
  }

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

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  return (
    <>
      <form className="settings" onSubmit={onSettingsSubmitHandler}>

        <div className="settings__container">

          <span>Name of game</span>
          <input
            type="text"
            className="game-name"
            value={settings.gameName}
            onChange={(e) => setSettings({ ...settings, gameName: e.target.value })}
          />

          {formValidation
          && <p className="settings__validation-error">name length must be more than 3 characters and less than 30</p>}

          <label htmlFor="dealer-in-game" className="settings__item">
            <span>Dealer in game</span>
            <input
              className="settings__checkbox"
              type="checkbox"
              id="dealer-in-game"
              checked={settings.isDealerInGame}
              onChange={(e) => setSettings({ ...settings, isDealerInGame: e.target.checked })}
            />
            <div className="custom-checkbox">{' '}</div>
          </label>

          <label htmlFor="auto-entry-opt" className="settings__item">
            <span>Auto entry</span>
            <input
              className="settings__checkbox"
              type="checkbox"
              id="auto-entry-opt"
              checked={settings.isAutoEntry}
              onChange={(e) => setSettings({ ...settings, isAutoEntry: e.target.checked })}
            />
            <div className="custom-checkbox">{' '}</div>
          </label>

          <label htmlFor="auto-finish-opt" className="settings__item">
            <span>Auto finish</span>
            <input
              className="settings__checkbox"
              type="checkbox"
              id="auto-finish-opt"
              checked={settings.isAutoFinish}
              onChange={(e) => setSettings({ ...settings, isAutoFinish: e.target.checked })}
            />
            <div className="custom-checkbox">{' '}</div>
          </label>

          <label htmlFor="allow-change-opt" className="settings__item">
            <span>Allow change vote</span>
            <input
              className="settings__checkbox"
              type="checkbox"
              id="allow-change-opt"
              checked={settings.isVoteMutable}
              onChange={(e) => setSettings({ ...settings, isVoteMutable: e.target.checked })}
            />
            <div className="custom-checkbox">{' '}</div>
          </label>

          <div className="settings__estimation">
            <p>Estimation Type</p>

            <label htmlFor="PowerOf2" className="settings__estimation-item">
              <span className="settings__estimation-description">Power of number 2</span>
              <input
                className="settings__estimation-input"
                type="radio"
                name="Estimation"
                id="PowerOf2"
                checked={settings.estimationType === 'power2'}
                onChange={() => setSettings({ ...settings, estimationType: 'power2' })}
              />
              <div className="custom-radio">
                <div className="custom-radio__checker">{' '}</div>
              </div>
            </label>

            <label htmlFor="Fibonacci" className="settings__estimation-item">
              <span className="settings__estimation-description">Fibonacci numbers</span>
              <input
                className="settings__estimation-input"
                type="radio"
                name="Estimation"
                id="Fibonacci"
                checked={settings.estimationType === 'fibonacci'}
                onChange={() => setSettings({ ...settings, estimationType: 'fibonacci' })}
              />
              <div className="custom-radio">
                <div className="custom-radio__checker">{' '}</div>
              </div>
            </label>
          </div>

          <label htmlFor="timer-opt" className="settings__item">
            <span>Timer </span>
            <input
              className="settings__checkbox"
              type="checkbox"
              id="timer-opt"
              checked={settings.isTimerRequired}
              onChange={(e) => setSettings({ ...settings, isTimerRequired: e.target.checked })}

            />
            <div className="custom-checkbox">{' '}</div>
          </label>
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
        <div className="settings__stories">

          <div className="settings__stories-controller">
            <button
              type="button"
              className="button button_green"
              onClick={() => setShouldShowPopupForAdd(true)}
            >
              Add story

            </button>
            <div className="file-choose">
              <label className="file-choose-text button button_red" htmlFor="file">
                Load Stories
                <input className="file-choose__input" type="file" accept=".json" id="file" onChange={onFileLoad} />
              </label>
              <p className="file-choose__tooltip">
                Story must have name and could have description. Possible format: .json
              </p>
            </div>
          </div>

          <Stories
            stories={settings.stories}
            setSettings={setSettings}
            setStoryToEdit={setStoryToEdit}
            setShouldShowPopupForAdd={setShouldShowPopupForAdd}
          />

        </div>
        <div className="settings__controller">
          {!storiesValidation
          && <p className="settings__validation-error">To start the game you must create at least one story</p>}
          {!game.id && <button type="submit" className="button button_red">Create game</button>}
          {game.isActive && <button type="submit" className="button button_red">Update game</button>}
        </div>

      </form>

      {shouldShowPopupForAdd && (
        <StoryPopup
          setShouldShowPopup={setShouldShowPopupForAdd}
          onPopupSubmit={onPopupSubmit}
          storyToEdit={storyToEdit}
        />
      )}

      {game.id && (
        <div className="settings__launch">
          <button type="button" onClick={gameActivitySwitcher} className="button button_red">
            {game.isActive ? 'Pause game' : 'Start game'}
          </button>
          <button className="button button_green" type="button" onClick={cancelGameHandler}>Cancel game</button>
        </div>
      )}

    </>
  );
}
