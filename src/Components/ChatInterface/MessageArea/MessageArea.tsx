import MessageList from "../MessageList/MessageList"
import { IMessage } from "../../../types"


import "./MessageArea.css"
import { useContext } from "react";
import {SessionContext} from "../../../SessionContext";

const MessageArea : React.FC = () => {
  const { messages } = useContext(SessionContext);

  return (
    <div className='message-area'>
        {messages.length == 0 ? 
        <h1 className='welcoming-header'>Hello, <br/> How can I help you today?</h1>
        : ""}
        <MessageList />
    </div>
  )
}

export default MessageArea