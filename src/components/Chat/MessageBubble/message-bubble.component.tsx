import { MessageBubbleProps } from './message-bubble.type';

import styles from '../chat.module.scss';

const MessageBubble = ({ message, onButtonClick, showOptions }: MessageBubbleProps) => {
  const isSystemMessage = !message.isUser;
  const convertedTime = new Date(message.timestamp * 1000).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' });

  return (
    <div className={`${styles.chatMessage} ${isSystemMessage ? styles.systemMessage : styles.userMessage}`}>
      <div className={styles.messageContainer}>
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>{convertedTime}</span>
      </div>

      {showOptions && message.uiType === 'button' && (
        <div className={styles.messageOptions}>
          {message.valueOptions.map((option: { value: string, text: string, nextId: number }) => (
            <button key={option.text} onClick={() => onButtonClick(option, message.name)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;