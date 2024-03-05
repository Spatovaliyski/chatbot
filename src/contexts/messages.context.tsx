import apiService from '@/services/service';
import React, { createContext, useContext, useEffect, useState } from 'react';

import {MessagesContextProps, Message, Choice} from '../types/messages.type';

// Create the context
export const MessagesContext = createContext<MessagesContextProps>({
  systemMessages: [],
  messages: [],
  choices: [],
  addMessage: () => { },
  addChoice: () => { },
  endConversation: () => { },
  loading: false,
});

// Create the provider component
const MessageProvider = ({ children }: any) => {
  const [systemMessages, setSystemMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(false);

  const addMessage = (message: Message, isUser: boolean = false) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const addChoice = (choice: Choice) => {
    setChoices((prevChoice) => [...prevChoice, choice]);
  }

  const endConversation = () => {
    setConversation(true);
  }

  useEffect(() => {
    if (conversation) {
      console.log(choices);
      console.log('Conversation ended:', conversation);

      apiService
        .postConversation(choices)
        .then((response) => {
          console.log('Conversation posted:', response);
        })
        .catch((error) => {
          console.error('Error posting conversation:', error);
        });
    }
  }, [conversation]);

  useEffect(() => {
    const fetchChatDefaultMessages = async () => {
      setLoading(true);
      try {
        const response = await apiService.getChatDefaultMessages();
        const formattedMessages = response.reduce((acc: any, message: any) => {
          acc[message.id] = message;
          return acc;
        }, {});

        setSystemMessages(formattedMessages);

      } catch (error) {
        console.error('Error fetching chat default messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDefaultMessages();

  }, []);

  const value: MessagesContextProps = {
    systemMessages,
    messages,
    choices,
    addMessage,
    addChoice,
    endConversation,
    loading,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessageProvider;
