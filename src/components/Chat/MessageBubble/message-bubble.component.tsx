import { MessageBubbleProps } from './message-bubble.type';

import styles from '../chat.module.scss';

/** 
 * MessageBubble component / Individual chat message
 * 
 * @param {MessageBubbleProps} props - component props
 * @returns {JSX.Element} - MessageBubble component
 * 
 * @exports MessageBubble
 */
const MessageBubble = ({ message, onButtonClick, showOptions }: MessageBubbleProps) => {
  const isSystemMessage = !message.isUser; // Check if the message is a system message
  const convertedTime = new Date(message.timestamp * 1000).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' }); // Convert timestamp to human-readable time

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