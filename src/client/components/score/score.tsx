import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types';
import ShowChoose from '../show-choose/show-choose';
import './style.scss';

export default function Score({ member } : { member: IUserInfo }): JSX.Element {
  const settings = useSelector((state: IStore) => state.game.settings);

  return (
    <div className="score">
      {member.role === 'observer' || (member.role === 'dealer' && !settings.isDealerInGame)
        ? <img width="50" src="./observer.png" alt="observer" /> : (<ShowChoose member={member} />)}
    </div>
  );
}
