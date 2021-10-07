import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCard } from '../../store/thunk';
import { IStore } from '../../types';
import Card from '../card/card';
import './style.scss';

export default function Cards(): JSX.Element {
  const { settings, isRoundActive } = useSelector((state: IStore) => state.game);
  const user = useSelector((state: IStore) => state.user);
  const dispatch = useDispatch();

  const fibonacci = [1, 2, 3, 5, 8, 16, 'Unknow'];
  const powOf2 = [1, 2, 4, 8, 16, 'Unknow'];

  const canIUse = !isRoundActive || user.role === 'observer'
  || (user.role === 'dealer' && !settings.isDealerInGame)
  || ((!!user.choose || user.choose === 0) && !settings.isVoteMutable);

  function onCardSelect(value: string | number) {
    if (canIUse) return;
    dispatch(setCard(value));
  }

  const currentArr = settings.estimationType === 'power2' ? powOf2 : fibonacci;
  return (
    <div className="cards">
      { currentArr.map((value) => (
        <Card
          key={`card_${value}`}
          selected={user.choose === value}
          onCardChange={() => onCardSelect(value)}
        >
          {value}
        </Card>
      ))}
    </div>
  );
}
