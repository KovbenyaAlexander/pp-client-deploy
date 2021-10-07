import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import { calculateResult } from '../../utils';
import ResultsCards from '../results-cards/results-cards';
import './style.scss';

export default function RoundResults(): JSX.Element {
  const { members, isRoundActive } = useSelector((state: IStore) => state.game);

  const [values, all] = calculateResult(members);

  return (
    <div className="round-results">
      {isRoundActive ? <p>Round in process</p> : <ResultsCards values={values} all={all} />}
    </div>
  );
}
