import React from 'react';
import './style.scss';

export default function WrappedName({ name }: { name :string }): JSX.Element {
  return (
    <>
      Waiting Game
      {' '}
      <span className="wrapped-name">
        {name}
      </span>
    </>
  );
}
