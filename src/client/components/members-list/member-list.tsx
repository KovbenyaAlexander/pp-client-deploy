import React from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types/store-types';
import Member from '../member/member';
import './style.scss';

export default function MemberList(): JSX.Element {
  const members = useSelector((state: IStore) => state.game.members);

  return (
    <section className="members">
      <h3 className="members__header">Members</h3>
      <ul className="members__list">
        {
          members.map((member) => (
            <Member key={member.userID} member={member} />
          ))
        }
      </ul>
    </section>
  );
}
