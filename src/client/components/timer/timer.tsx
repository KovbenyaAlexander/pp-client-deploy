import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import './style.scss';

function calculateTime(strTime: string): number {
  let [minute, seconds]: string[] | number[] = strTime.split(':');
  minute = +minute * 60;
  seconds = +seconds + minute;
  return seconds;
}

export default function Timer(): JSX.Element {
  const settings = useSelector((state: IStore) => state.game.settings);
  const [initValue, setTime] = useState(calculateTime(settings.timerValue));

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

  return (
    <div className="timer">
      <p className="timer__minutes">{min < 10 ? `0${min}` : min}</p>
      <p className="timer__separator">:</p>
      <p className="timer__seconds">{sec < 10 ? `0${sec}` : sec}</p>
    </div>
  );
}
