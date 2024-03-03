import React, { FC, useContext, useEffect, useState } from 'react';
import MessageProvider, { MessagesContext } from '@/contexts/messages.context';

import styles from './chat.module.scss';
import MessageBubble from './message-bubble.component';

const ChatBody: FC = () => {
  const { systemMessages, messages, endChat, addMessage } = useContext(MessagesContext);
  const startMessage = systemMessages[100];

  const handleButtonClick = (option: { text: string, nextId: number | false }) => {
    if (option.nextId !== false) {
      const nextSysMessage = systemMessages[option.nextId];

      if (nextSysMessage) {
        addMessage({
          id: messages.length + 1, // Generate unique message ID
          text: option.text,
          isUser: true,
          nextId: option.nextId,
          uiType: 'button',
          valueType: 'text',
          valueOptions: [],
        });
        addMessage(nextSysMessage);
      }
    } else {
      endChat(true);
    }
  };

  return (
    <div className={styles.chatBody}>
      {startMessage && (
        <MessageBubble message={startMessage} onButtonClick={handleButtonClick} showOptions={messages.length < 1 ? true : false} />
      )}
      
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onButtonClick={handleButtonClick} showOptions={messages.indexOf(message) === messages.length - 1} />
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
