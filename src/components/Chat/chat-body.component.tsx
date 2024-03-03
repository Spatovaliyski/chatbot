import React, { FC, useContext, useEffect, useState } from 'react';
import MessageProvider, { MessagesContext } from '@/contexts/messages.context';

import styles from './chat.module.scss';

const ChatBody: FC = () => {
  const { messageFlow, messages, addMessage } = useContext(MessagesContext);

  const startMessage = messageFlow[100];

  const handleButtonClick = (nextId: number | false) => {
    if (nextId !== false) {
      const nextMessage = messages.find(message => message.id === nextId);

      if (nextMessage) {
        addMessage(nextMessage.text, nextMessage.id);
      } else {
        addMessage("End of chat", false);
      }
    } else {
      addMessage("End of chat", false);
    }
  };

  return (
    <div className={styles.chatBody}>
      <div key={startMessage.id}>
        <p>{startMessage.text}</p>
        {/* Render buttons if uiType is 'button' */}
        {startMessage.uiType === 'button' && (
          <div>
            {startMessage.valueOptions.map(option => (
              <button key={option.text} onClick={() => handleButtonClick(option.nextId)}>
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
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
