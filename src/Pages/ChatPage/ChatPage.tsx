import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "./ChatPage.css"
import ChatInterface from '../../Components/ChatInterface/ChatInterface'
import { SessionContext } from '../../SessionContext';
import { IMessage } from '../../types';

function ChatPage() {
  const [sessionId, setSessionId] = useState<String>("");
  const [clientId, setClientId] = useState<String>("");
  const [messages, setMessages] = useState<IMessage[]>([
  ])

  const { sessionId: urlSessionId, clientId: urlClientId } = useParams<{ sessionId: string, clientId: string }>();

  useEffect(() => {
    if (!urlSessionId) {
      // Fetch sessionId from server if not provided in URL params
      const fetchSessionId = async () => {
        try {
          const response = await fetch('http://localhost:8080/start');
          if (!response.ok) {
            throw new Error('Failed to fetch sessionId');
          }
          console.log("response:", response)
          const data = await response.json();
          setSessionId(data.sessionId);
        } catch (error) {
          console.error('Error fetching sessionId:', error);
        }
      };

      fetchSessionId();
    } else {
      // Set sessionId from URL params if provided
      setSessionId(urlSessionId);
    }

    // Generate clientId
    const newClientId = "university"
    setClientId(newClientId);
  }, [urlSessionId, urlClientId]); // Update state when URL params change

  const sendMessage = (text: String) => {
    const receiveResponse = async () => {
      try {
        let url = `http://localhost:8080/chat?`
        url += `clientId=${encodeURIComponent(clientId as string)}&`
        url += `sessionId=${encodeURIComponent(sessionId as string)}&`
        url += `input=${encodeURIComponent(text as string)}`

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch sessionId');
        }
        console.log("response:", response)
        const data = await response.json();

        setMessages([...messages, { text, isUser: true }])


        await new Promise(resolve => setTimeout(resolve, 500))
        const responseText = data.response;
        for (let i = 0; i < responseText.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 25)); // Wait for 100ms before adding the next character
          setMessages(prevMessages => [...prevMessages.filter((val, ind) => i == 0 || ind != prevMessages.length - 1), { text: responseText.slice(0, i + 1), isUser: false }]);
        }

      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages([...messages, { text, isUser: true }])
      }
    }
    receiveResponse()
  }

  return (
    <>
      <SessionContext.Provider value={{ clientId, sessionId, messages, sendMessage: sendMessage }}  >
        <ChatInterface />
      </SessionContext.Provider>
    </>
  )
}

export default ChatPage