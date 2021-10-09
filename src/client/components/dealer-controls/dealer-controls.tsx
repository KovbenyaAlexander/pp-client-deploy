import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import { calculateResult } from '../../utils';
import './style.scss';

export default function DealerControls(): JSX.Element {
  const socket = useSelector((state: IStore) => state.socket);
  const members = useSelector((state: IStore) => state.game.members);
  const isRoundActive = useSelector((state: IStore) => state.game.isRoundActive);
  const stories = useSelector((state: IStore) => state.game.settings.stories);
  const activeStory = stories.find((story) => story.isActive);

  function onRoundStart(): void {
    socket?.startRound();
  }

  function onRoundStop(): void {
    socket?.stopRound();
  }

  function onFinishStory(): void {
    const [values, all] = calculateResult(members);
    let bigest: number | string = 0;
    let key: number | string = 0;
    Object.entries(values).forEach((entries) => {
      if (entries[1] > bigest) {
        [key, bigest] = entries;
      }
    });
    socket?.finishStory(key);
  }

  function onFinishGame(): void {
    const [values, all] = calculateResult(members);
    let bigest: number | string = 0;
    let key: number | string = 0;
    Object.entries(values).forEach((entries) => {
      if (entries[1] > bigest) {
        [key, bigest] = entries;
      }
    });
    if (stories.length) {
      socket?.finishGame(stories);
      return;
    }
    socket?.finishGame(key);
  }

  return (
    <div className="dealer-controls">
      <button
        type="button"
        className="button dealer-controls__start-round button_green"
        onClick={onRoundStart}
        disabled={isRoundActive}
      >
        Start Round
      </button>
      <button
        type="button"
        className="button dealer-controls__stop-round button_red"
        onClick={onRoundStop}
        disabled={!isRoundActive}
      >
        Stop Round
      </button>
      {activeStory && (
        <button
          type="button"
          className="button dealer-controls__finish-story button_green"
          onClick={onFinishStory}
        >
          Finish Story
        </button>
      )}
      <button
        type="button"
        className="button dealer-controls__finish-game button_red"
        onClick={onFinishGame}
      >
        Finish Game

      </button>
    </div>
  );
}
