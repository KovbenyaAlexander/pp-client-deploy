import React from 'react';
import { useSelector } from 'react-redux';
import ExcludingInit from '../../components/excluding-init/excluding-init';
import Exluding from '../../components/excluding/excluding';
import Launch from '../../components/launch/launch';
import MemberList from '../../components/members-list/member-list';
import MessageForExcluded from '../../components/message-excluded/message-excluded';
import Popup from '../../components/popup/popup';
import Settings from '../../components/settings/settings';
import Chat from '../../components/chat/chat';
import { IStore } from '../../types/store-types';
import { isDealer } from '../../utils';
import './style.scss';

export default function Lobby(): JSX.Element {
  const { game, user } = useSelector((state: IStore) => state);
  const dealer = user ? isDealer(game, user.userID) : false;

  return (
    <article className="lobby">
      <h3 className="lobby__title">
        {game.excluding.IsYouExcluded ? 'Game Ends for You' : `Waiting for start game ${game.settings.gameName}`}
      </h3>
      {game.excluding.IsYouExcluded ? <MessageForExcluded /> : (
        <section className="lobby__chat">
          <MemberList />
          <Chat />
        </section>
      )}
      {
        dealer
        && (
          <section className="lobby__settings">
            <Settings />
            <hr />
            <Launch />
          </section>
        )
      }
      { game.excluding.isActive
        && (
          <Popup>
            <Exluding />
          </Popup>
        )}
      {game.excluding.user && !game.excluding.isActive && (
        <Popup><ExcludingInit user={game.excluding.user} /></Popup>
      )}
    </article>
  );
}
