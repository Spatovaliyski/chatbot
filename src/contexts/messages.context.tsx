import apiService from '@/services/service';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the message structure interface
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  uiType: string;
  valueType: string;
  valueOptions: ValueOption[];
}

// Define the value option structure interface
interface ValueOption {
  nextId: number | false;
  value: boolean | string | number;
  text: string;
}

// Define the context interface
interface MessagesContextProps {
  messageFlow: Message[],
  messages: Message[];
  addMessage: (value: boolean | string | number, nextId: number | false) => void;
  loading: boolean;
}

// Create the context
export const MessagesContext = createContext<MessagesContextProps>({
  messageFlow: [],
  messages: [],
  addMessage: () => {},
  loading: false,
});

// Create the provider component
const MessageProvider = ({ children }: any) => {
  const [messageFlow, setMessageFlow] = useState([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (value: boolean | string | number, nextId: number | false) => {
    const currentMessage = messages.find(message => message.id === nextId);

    if (currentMessage && nextId !== false) {
      setMessages([...messages, currentMessage]);
    }

    // Add the selected value to the state
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        isUser: true,
        text: `Selected value: ${value}`,
        uiType: 'button',
        valueType: typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'number' : 'string', // Example value type
        valueOptions: [], 
      }
    ]);
  };

  useEffect(() => {
    // Simulate API call to get chat default messages
    const fetchChatDefaultMessages = async () => {
      setLoading(true);
      try {
        const response = await apiService.getChatDefaultMessages();
        const formattedMessages = response.reduce((acc: any, message: any) => {
          acc[message.id] = message;
          return acc;
        }, {});
        setMessageFlow(formattedMessages);
      } catch (error) {
        console.error('Error fetching chat default messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatDefaultMessages();

  }, []);

  const value: MessagesContextProps = {
    messageFlow,
    messages,
    addMessage,
    loading,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessageProvider;
