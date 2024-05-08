
import React from 'react';
import { IMessage } from './types';

interface SessionContextType {
    sessionId: String;
    clientId: String;
    messages: IMessage[],
    sendMessage: (text: String) => void
}

export const SessionContext = React.createContext<SessionContextType>({
    sessionId: "",
    clientId: "",
    messages: [
    ],
    sendMessage: (text: String) => { }
});
