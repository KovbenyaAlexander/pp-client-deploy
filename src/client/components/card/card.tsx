/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './style.scss';

export default function Card({ children, selected, onCardChange }
:{ children: number | string, selected: boolean, onCardChange: () => void }): JSX.Element {
  return (
    <div role="listitem" className={`card ${selected ? 'card_selected' : ''}`} onClick={onCardChange}>
      <p className="card__pointer card__pointer_upper">{children}</p>
      <p className="card__pointer card__pointer_lower">{children}</p>
    </div>
  );
}
