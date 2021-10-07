import React from 'react';
import './style.scss';

interface IChatController {
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  sendMessage: (e: React.FormEvent)=>void
}

export default function ChatController({ message, setMessage, sendMessage }: IChatController): JSX.Element {
  return (
    <div className="chat">

      <form className="chat__controller controller" onSubmit={sendMessage}>
        <input
          className="controller__input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={100}
        />
        <button className="button controller__submit" type="submit">Send</button>
      </form>

    </div>

  );
}
