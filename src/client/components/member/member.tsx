import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StartExclude } from '../../store/actions';
import { IExclude, IStore, IUserInfo } from '../../types/store-types';
import { isCurrentUser, isDealer } from '../../utils';
import Avatar from '../avatar/avatar';
import Score from '../score/score';
import './style.scss';

export default function Member({ member } : { member: IUserInfo }): JSX.Element {
  const {
    game, user, socket, usersImages,
  } = useSelector((state: IStore) => state);
  const dispatch = useDispatch();
  const { userID, name } = member;
  const isDealerMember = isDealer(game, userID);
  const isExludable = !isDealerMember && !isCurrentUser(user, userID) && (game.members.length - 1) >= 3;
  const photoUser = usersImages.find((ent) => ent.id === userID);

  function handleExcludeInit(): void {
    const exclude: IExclude = {
      isActive: false,
      user: member,
    };

    if (user.role === 'dealer') {
      socket?.initExclude(exclude, true);
      return;
    }
    dispatch(StartExclude(exclude));
  }
  return (
    <>
      <li className="member">
        <Avatar name={name} imgSrc={photoUser ? photoUser.image : ''} />
        <h4 className="member__name">{ name }</h4>
        {member.role !== 'player'
      && <h3 className={`member__special member__special_${member.role}`}>{`${member.role}`}</h3>}
        { ((user.role === 'dealer' && !isDealerMember) || isExludable) && (
          <button
            className="button button_red"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleExcludeInit();
            }}
          >
            Kick
          </button>
        ) }
        {
          game.isActive && <Score member={member} />
        }
      </li>

    </>
  );
}
