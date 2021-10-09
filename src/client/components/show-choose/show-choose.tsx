/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import { IStore, IUserInfo } from '../../types';
import Card from '../card/card';
import './style.scss';

export default function ShowChoose({ member } : { member: IUserInfo }): JSX.Element {
  const isRoundActive = useSelector((state: IStore) => state.game.isRoundActive);

  function showChoose() {
    if (member.choose) return 'card.png';
    return 'think.png';
  }

  return (
    isRoundActive
      ? <img width="50" src={showChoose()} alt="member round action" />
      : (member.choose ? (
        <Card selected={false} onCardChange={() => {}}>
          {member.choose === 'Unknow' ? 'U' : member.choose}
        </Card>
      ) : <div>{' '}</div>)
  );
}
