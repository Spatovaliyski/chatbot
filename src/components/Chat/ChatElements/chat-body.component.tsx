import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import MessageProvider, { MessagesContext } from '@/contexts/messages.context';

import { useTimestamp } from '@/hooks/useTimestamp';
import styles from '../chat.module.scss';
import MessageBubble from '../MessageBubble/message-bubble.component';

/**
 * ChatBody component
 * 
 * @returns {JSX.Element} - ChatBody component
 * @exports ChatBody
 */
const ChatBody: FC = () => {
  const { systemMessages, messages, endConversation, addChoice, addMessage } = useContext(MessagesContext);
  const [initiated, setInitiated] = useState(false);
  const setUnixTimestamp = useTimestamp();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  /** 
   * Initialize the chat with the first system message
   * Make sure it's called only once
   * 
   * @param {Array<Message>} systemMessages - array of system messages
   * @param {boolean} initiated - chat initiated flag
   * @param {function} addMessage - addMessage function
   * @param {function} setInitiated - setInitiated function
   * 
   * @returns {void}
   */
  useEffect(() => {
    if (systemMessages && !initiated) {
      const startMessage = systemMessages[100];

      if (startMessage) {
        startMessage.timestamp = setUnixTimestamp;
        addMessage(startMessage);
        setInitiated(true)
      }
    }
  }, [systemMessages, addMessage, initiated]);

  /** 
   * Handle button click
   * 
   * @param {object} option - The option selected by user
   * @param {string} option.text - The option's text
   * @param {number | false} option.nextId - ID of the next message within the systemMessages array
   * 
   * @returns {void}
  */
  const handleButtonClick = (option: { value: string, text: string, nextId: number }, choiceName: string) => {
    const nextSysMessage = systemMessages[option.nextId];

    addChoice({
      value: choiceName,
      text: option.value,
    });

    addMessage({
      id: messages.length + 1, // Generate unique message ID
      name: choiceName,
      text: option.text,
      isUser: true,
      timestamp: setUnixTimestamp,
      nextId: option.nextId,
      uiType: 'button',
      valueType: 'text',
      valueOptions: [],
    });

    if (!option.nextId) {
      setTimeout(() => {
        addMessage({
          id: messages.length + 1, // Generate unique message ID
          name: choiceName,
          text: 'Herzlichen Dank für Ihre Angaben',
          isUser: false,
          timestamp: setUnixTimestamp,
          nextId: false,
          uiType: 'button',
          valueType: 'text',
          valueOptions: [],
        })
        
        endConversation();
      }, 400);

      return; // Don't add any more messages if there's no nextId
    }

    if (nextSysMessage) {
      setTimeout(() => {
        nextSysMessage.timestamp = setUnixTimestamp;
        addMessage(nextSysMessage);
      }, 400);
    }
  };

  /** 
   * Scroll to the bottom of the chat body when a new message is added
   * 
   * @param {Array<Message>} messages - array of messages
   * @param {HTMLDivElement} chatBodyRef - chatBodyRef - reference to the chat body
   * 
  */
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatBody} ref={chatBodyRef}>      
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id + index} // Ensure unique key by adding index
          message={message}
          onButtonClick={handleButtonClick}
          showOptions={messages.indexOf(message) === messages.length - 1}
        />
      ))}
    </div>
  );
};

const ChatContainer: FC = () => {
  return (
    <MessageProvider>
      <ChatBody />
    </MessageProvider>
  );
};

export default ChatContainer;
