import React from 'react';
import { IChatMessage } from '../../types';
import './style.scss';

interface IChatMessages {
  messages: Array<IChatMessage>
  userID: string
}

export default function ChatMessages({ messages, userID }: IChatMessages): JSX.Element {
  return (
    <div className="chat__messages">

      {messages.map((msg: IChatMessage) => {
        let classes;

        if (msg.isServiceMessage) {
          classes = 'chat__messages-service';
        } else if (userID === msg.userId) {
          classes = 'chat__messages-left';
        } else {
          classes = 'chat__messages-right';
        }
        return (
          <div key={msg.messageId} className={`${classes} message`}>

            <div className="message__container">
              <span className="message__author">
                {msg.authorMessage}
              </span>
              <p className="message__text">
                {msg.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>

  );
}
