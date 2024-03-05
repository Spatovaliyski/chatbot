
export interface Message {
  id: number;
  name: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  nextId: number | false;
  uiType: string;
  valueType: string;
  valueOptions: [];
}

export interface Choice {
  text: string;
  value: string;
}

export interface MessagesContextProps {
  systemMessages: Message[],
  messages: Message[];
  choices: Choice[];
  addMessage: (message: Message) => void;
  addChoice: (choice: Choice) => void;
  endConversation: () => void;
  loading: boolean;
}