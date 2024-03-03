import styles from './chat.module.scss';
import { Message } from '@/contexts/messages.context';

interface MessageBubbleProps {
  message: Message;
  showOptions: boolean;
  onButtonClick: (option: { text: string, nextId: number }) => void;
}

const MessageBubble = ({ message, onButtonClick, showOptions }: MessageBubbleProps) => {
  const isSystemMessage = !message.isUser;

  return (
    <div className={`${styles.chatMessage} ${isSystemMessage ? styles.systemMessage : styles.userMessage}`}>
      <p>{message.text}</p>
      {showOptions && message.uiType === 'button' && (
        <div className={styles.messageOptions}>
          {message.valueOptions.map((option: { text: string, nextId: number }) => (
            <button key={option.text} onClick={() => onButtonClick(option)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;