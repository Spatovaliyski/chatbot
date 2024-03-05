import React from 'react'
import styles from '../chat.module.scss';

import { IoIosReturnLeft } from "react-icons/io";

interface Props {}

/** 
 * ChatTextArea component
 * NOTE: This component is only visual, it's not actually sending any messages
 * 
 * @param {Props} props - component props
 * @returns {JSX.Element} - ChatTextArea component
 * @exports ChatTextArea
 */
const ChatTextArea = (props: Props) => {
  return (
    <div className={`${styles.chatTextArea} ${styles.isDisabled}`}>
      <textarea></textarea>
      <button>
        <IoIosReturnLeft />
      </button>
    </div>
  )
}

export default ChatTextArea;