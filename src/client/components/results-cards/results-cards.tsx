import React from 'react';
import Card from '../card/card';
import './style.scss';

export default function ResultsCards({ values, all }
: { values : { [key: string]: number | string }, all : number }): JSX.Element {
  const stat = Object.entries(values).map((kv) => (
    <div className="results-cards__card" key={`card-result_${kv[0]}-${kv[1]}`}>
      <Card onCardChange={() => {}} selected={false}>{kv[0] === 'Unknow' ? 'U' : kv[0]}</Card>
      <p className="result-card__value">{`${((+kv[1] / all) * 100).toFixed(2)} %`}</p>
    </div>
  ));

  return (
    <div className="results-cards">
      { stat }
    </div>
  );
}
