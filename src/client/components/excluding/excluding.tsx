import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StopExlude } from '../../store/actions';
import { IStore } from '../../types/store-types';
import './style.scss';

export default function Exluding(): JSX.Element {
  const store = useSelector((state: IStore) => state.game.excluding);
  const socket = useSelector((state: IStore) => state.socket);
  const dispatch = useDispatch();

  function handleConfirm(): void {
    socket?.confirmExclude(true);
    dispatch(StopExlude());
  }

  function handleCancel(): void {
    socket?.confirmExclude(false);
    dispatch(StopExlude());
  }

  return (
    <div>
      <h3>
        {`Exlude ${store.user?.name}`}
      </h3>
      <h4>
        {`Reason: ${store.reason}`}
      </h4>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          await handleCancel();
        }}
      >
        No
      </button>
    </div>
  );
}
