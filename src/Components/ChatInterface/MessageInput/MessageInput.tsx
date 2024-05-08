import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

import "./MessageInput.css"
import { SessionContext } from '../../../SessionContext';


const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useContext(SessionContext)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Handle sending the message
      console.log('Sending message:', message);
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className='message-input'>
      <input
        type="text"
        className="text-input"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MessageInput;
