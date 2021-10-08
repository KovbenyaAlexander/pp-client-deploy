import React from 'react';
import './style.scss';

interface IChatController {
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  sendMessage: (e: React.FormEvent)=>void
}

export default function ChatController({ message, setMessage, sendMessage }: IChatController): JSX.Element {
  return (
    <div className="chat__controller">

      <form className="chat__controller controller" onSubmit={sendMessage}>
        <input
          className="controller__input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={100}
          placeholder="Your message..."
        />
        <button className="button button_red controller__submit " type="submit">Send</button>
      </form>

    </div>

  );
}
