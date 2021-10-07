import React from 'react';
import MemberList from '../members-list/member-list';
import RoundResults from '../round-results/round-results';
import './style.scss';

export default function GameInfo(): JSX.Element {
  return (
    <section className="info">
      <div className="info__members">
        <MemberList />
      </div>
      <RoundResults />
    </section>
  );
}
