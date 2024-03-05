import { Message } from '@/types/messages.type';

export interface MessageBubbleProps {
  message: Message;
  showOptions: boolean;
  onButtonClick: (
    option: {
      value: string,
      text: string,
      nextId: number
    },
    name: string
  ) => void;
}