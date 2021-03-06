import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StopExlude } from '../../store/actions';
import { IExclude, IStore, IUserInfo } from '../../types/store-types';
import './style.scss';

export default function ExcludingInit({ user }
: { user: IUserInfo }): JSX.Element {
  const dispatch = useDispatch();
  const socket = useSelector((state: IStore) => state.socket);
  const [reason, setReason] = useState('');

  function handleConfirm(): void {
    const exclude: IExclude = {
      isActive: false,
      user,
      reason,
    };
    socket?.initExclude(exclude, false);
  }

  function handleCancel(): void {
    dispatch(StopExlude());
  }
  return (
    <div className="exclude-init">
      <h2 className="exclude-init__title">
        {`Do you really want to kick: ${user.name}? Please give a reason:`}
      </h2>
      <input
        className="exclude-init__reason"
        type="text"
        value={reason}
        onChange={(e) => {
          e.preventDefault();
          setReason(e.target.value);
        }}
      />
      <div className="exclude-init__buttons">
        <button
          className="button button_green button_medium"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          Yes
        </button>
        <button
          className="button button_red button_medium"
          type="button"
          onClick={async (e) => {
            e.preventDefault();
            await handleCancel();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
