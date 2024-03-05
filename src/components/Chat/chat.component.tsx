'use client';

import React, { useState } from 'react'
import ChatWrapper from './ChatElements/chat-wrapper.component'
import ChatBubble from './ChatElements/chat-bubble.component'

/** 
 * The Chat component
 * 
 * @returns {JSX.Element} - Chat component
 * @exports Chat
 * 
 */
const Chat = () => {
  const [toggleChat, setToggleChat] = useState(false);

  return (
    <>
      <ChatBubble isToggled={toggleChat} toggle={() => setToggleChat(!toggleChat)} />

      {toggleChat && <ChatWrapper />}
    </>
  )
}

export default Chat;