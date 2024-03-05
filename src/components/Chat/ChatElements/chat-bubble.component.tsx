import React from 'react'
import styles from '../chat.module.scss';
import { TiMessages } from 'react-icons/ti';
import { IoMdClose } from "react-icons/io";

interface Props {
  toggle: () => void;
  isToggled: boolean;
}

/** 
 * Toggle chat bubble component (open/close chat)
 * 
 * @param {Props} props - component props
 * @returns {JSX.Element} - ChatBubble component
 * @exports ChatBubble
 */
const ChatBubble = (props: Props) => {
  const handleToggle = () => {
    props.toggle();
  }
  
  return (
    <div className={styles.chatBubble} onClick={handleToggle}>
      {props.isToggled ? <IoMdClose /> : <TiMessages />}
    </div>
  )
}

export default ChatBubble;