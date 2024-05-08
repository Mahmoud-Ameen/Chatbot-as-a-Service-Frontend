import React, { useContext } from 'react';
import Message from '../Message/Message'; // Import the Message component
import {SessionContext} from '../../../SessionContext';
import './MessageList.css'; 

const MessageList: React.FC= () => {
  const { messages } = useContext(SessionContext);

  return (
    <div className="message-list">
      {/* Render each message in the messages array */}
      {messages.map((message, index) => {
        console.log(message)
        return (<Message key={index} text={message.text} isUser={message.isUser} /> )
      }
      )}
    </div>
  );
};

export default MessageList;
