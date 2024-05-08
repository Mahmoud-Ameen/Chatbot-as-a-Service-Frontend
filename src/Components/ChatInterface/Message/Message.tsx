import React from 'react';
import './Message.css'; 

interface MessageProps {
  text: String;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  return (
    <div className={isUser ? 'message user' : 'message chatbot'}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
