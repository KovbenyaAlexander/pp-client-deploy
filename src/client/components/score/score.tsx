import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types';
import './style.scss';

export default function Score({ member } : { member: IUserInfo }): JSX.Element {
  const { isRoundActive, settings } = useSelector((state: IStore) => state.game);

  function showChoose() {
    if ((member.choose || member.choose === 0) && isRoundActive) return 'Waiting until Round ends';
    if (member.choose || member.choose === 0) {
      return `Player choose - ${member.choose}`;
    }
    return 'Thinking';
  }
  return (
    <section className="score">
      {member.role === 'observer' || (member.role === 'dealer' && !settings.isDealerInGame) ? <p>Observer</p> : (
        <p>{showChoose()}</p>
      )}
    </section>
  );
}
