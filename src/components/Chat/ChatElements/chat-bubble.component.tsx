import React from 'react'
import styles from '../chat.module.scss';
import { TiMessages } from 'react-icons/ti';

interface Props {
  setChatOpen: () => void;
}

const ChatBubble = (props: Props) => {
  return (
    <div className={styles.chatBubble} onClick={props.setChatOpen}>
      <TiMessages />
    </div>
  )
}

export default ChatBubble;