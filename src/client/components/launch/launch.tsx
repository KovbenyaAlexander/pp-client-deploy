import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useHistory } from 'react-router';
import { cancelGame, activitySwitcher } from '../../store/thunk';
import { IStore } from '../../types';
import './style.scss';

export default function Launch(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id, name, isActive } = useSelector((state: IStore) => ({
    name: state.user.name,
    id: state.game.id,
    isActive: state.game.isActive,
  }));

  const cancelGameHandler = () => {
    dispatch(cancelGame());
  };

  const gameActivitySwitcher = () => {
    dispatch(activitySwitcher(isActive));
    history.push(`/game/${id}`);
  };

  return (
    <div className="launch">
      {id && (
        <>
          <div className="launch__item">
            <p>GameId:</p>
            <div className="launch__item-wrapper">
              <input className="input-launch" value={id} />
              <CopyToClipboard
                text={id}
              >
                <button className="button button_red launch-copy-btn" type="button">Copy</button>
              </CopyToClipboard>
            </div>
          </div>

          <div className="launch__item">
            <p>Game Link:</p>
            <div className="launch__item-wrapper">
              <input
                className="input-launch"
                value={`https://kovbenyaalexander.github.io/pp-client-deploy/#/connect/${id}`}
              />
              <CopyToClipboard
                text={`https://kovbenyaalexander.github.io/pp-client-deploy/#/connect/${id}`}
              >
                <button className="button button_red launch-copy-btn" type="button">Copy</button>
              </CopyToClipboard>
            </div>

          </div>

        </>
      )}

    </div>
  );
}
