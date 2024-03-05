import apiService from '@/services/service';
import React, { createContext, useContext, useEffect, useState } from 'react';

import {MessagesContextProps, Message, Choice} from '../types/messages.type';

/**
 * MessagesContext context
 * 
 * @type {React.Context<MessagesContextProps>}
 */
export const MessagesContext = createContext<MessagesContextProps>({
  systemMessages: [],
  messages: [],
  choices: [],
  addMessage: () => { },
  addChoice: () => { },
  endConversation: () => { },
  loading: false,
});

/**
 * MessageProvider component
 * 
 * @param {any} children - component children
 * @returns {JSX.Element} - MessageProvider component
 * @exports MessageProvider
 */
const MessageProvider = ({ children }: any) => {
  const [systemMessages, setSystemMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(false);

  /** 
   * Add a message to the chat
   * 
   * @param {Message} message - The message to add
   * 
   * @returns {void}
   */
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  /** 
   * Add the selected choice to the payload
   * 
   * @param {Choice} choice - The choice to add
   * 
   * @returns {void}
   */
  const addChoice = (choice: Choice) => {
    setChoices((prevChoice) => [...prevChoice, choice]);
  }

  /**
   * Conversation end trigger
   * 
   * @returns {void}
   */
  const endConversation = () => {
    setConversation(true);
  }

  /**
   * Post conversation to the API
   * 
   * @param {boolean} conversation - The conversation to post
   *
   */
  useEffect(() => {
    if (conversation) {
      apiService
        .postConversation(choices)
        .then((response) => {
          console.log('Conversation posted:', response); // Only for testing purposes
        })
        .catch((error) => {
          console.error('Error posting conversation:', error); // Only for testing purposes
        });
    }
  }, [conversation]);

  /** 
   * Fetch chat default messages
   */
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

  // Value for the context provider
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
