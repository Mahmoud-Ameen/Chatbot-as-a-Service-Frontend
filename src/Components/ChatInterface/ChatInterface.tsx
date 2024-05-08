import React, { useState, ChangeEvent, KeyboardEvent, useContext } from 'react';
import MessageInput from './MessageInput/MessageInput'
import { SessionContext } from '../../SessionContext';
import MessageArea from './MessageArea/MessageArea';
import "./ChatInterface.css"

const ChatInterface: React.FC = () => {
    const [message, setMessage] = useState('');
    const {addMessage} = useContext(SessionContext)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Handle sending the message
            console.log('Sending message:', message);
            addMessage(message, true);
            setMessage('');
        }
    };

    return (
        <div className="chat-interface container">
            <MessageArea />
            <MessageInput
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default ChatInterface;
