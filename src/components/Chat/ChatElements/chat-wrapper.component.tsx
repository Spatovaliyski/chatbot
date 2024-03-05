import React, { FC, useState } from 'react'

import ChatHeader from './chat-header.component'
import ChatBody from './chat-body.component';

import styles from '../chat.module.scss'
import ChatTextArea from './chat-textarea.component';

type Props = {}

/**
 * ChatWrapper component
 * 
 * @param {Props} props - component props
 * @returns {JSX.Element} - ChatWrapper component
 * @exports ChatWrapper
 */
const ChatWrapper:FC = (props: Props) => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chat}>
        <ChatHeader />
        <ChatBody />
        <ChatTextArea />
      </div>
    </div>
  )
}

export default ChatWrapper;