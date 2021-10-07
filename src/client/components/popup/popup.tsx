import React from 'react';
import './style.scss';

export default function Popup({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        {children}
      </div>
    </div>
  );
}
