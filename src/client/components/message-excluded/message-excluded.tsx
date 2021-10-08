import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setInitialStore } from '../../store/actions';
import { IStore } from '../../types';
import './style.scss';

export default function MessageForExcluded(): JSX.Element {
  const exclude = useSelector((state: IStore) => state.game.excluding);
  const dispatch = useDispatch();
  const history = useHistory();
  const [initValue, setTime] = useState(30);

  function reverseTime(min: number, sec: number): number[] {
    if (sec < 60) {
      return [min, sec];
    }
    return reverseTime(min + 1, sec - 60);
  }

  function timeInterval(): void {
    setTimeout(() => {
      setTime(initValue - 1);
    }, 1000);
  }

  if (initValue > 0) {
    timeInterval();
  }

  const [min, sec] = reverseTime(0, initValue);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setInitialStore());
      history.push('/');
    }, 30000);
  }, []);
  return (
    <section className="message-excluded">
      <h3 className="message-excluded__reason">
        {` You was excluded, because ${exclude.reason}`}
      </h3>
      <h4 className="message-excluded__next-action">You will be redirected to main page</h4>
      <div className="message-excluded__timer">
        <p>{`0${min}:${sec}`}</p>
      </div>
    </section>
  );
}
