import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from '../../types';
import ChatMessages from '../chat-messages/chat-messages';
import ChatController from '../chat-controller/chat-controller';
import './style.scss';

export default function Chat(): JSX.Element {
  const socket = useSelector((state: IStore) => state.socket);
  const messages = useSelector((state: IStore) => state.chat.messages);
  const userID = useSelector((state: IStore) => state.user.userID);
  const name = useSelector((state: IStore) => state.user.name);

  const [message, setMessage] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (message !== '') {
      socket?.sendMessage(message, name);
    }
  };

  return (
    <div className="chat">
      <ChatMessages messages={messages} userID={userID} />
      <ChatController message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>

  );
}
