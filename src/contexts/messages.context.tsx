import apiService from '@/services/service';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the message structure interface
export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  nextId: number | false;
  uiType: string;
  valueType: string;
  valueOptions: [];
}

// Define the context interface
interface MessagesContextProps {
  systemMessages: Message[],
  messages: Message[];
  addMessage: (message: Message) => void;
  endChat: (isComplete: boolean) => void;
  loading: boolean;
}

// Create the context
export const MessagesContext = createContext<MessagesContextProps>({
  systemMessages: [],
  messages: [],
  addMessage: () => { },
  endChat: () => { },
  loading: false,
});

// Create the provider component
const MessageProvider = ({ children }: any) => {
  const [systemMessages, setSystemMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (message: Message, isUser: boolean = false) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const wrapConversation = (messages: any) => {
    messages.forEach((message: Message) => {
      if (!message.isUser) {
        setConversation((prevConversation) => [...prevConversation, message]);
      }
    });
  }

  const endChat = (isComplete: boolean) => {
    if (isComplete) {
      wrapConversation(messages);
    }
  }

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
    addMessage,
    endChat,
    loading,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessageProvider;
