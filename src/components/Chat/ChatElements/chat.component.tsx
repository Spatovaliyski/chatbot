'use client';

import React, { FC, useState } from 'react'

import ChatHeader from './chat-header.component'
import ChatToggleBubble from './chat-bubble.component'
import ChatBody from './chat-body.component';

import styles from '../chat.module.scss'
import ChatTextArea from './chat-textarea.component';

type Props = {}

const Chat: FC = (props: Props) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chat}>
        <ChatHeader />
        <ChatBody />
        <ChatTextArea />
      </div>

      <ChatToggleBubble setChatOpen={setChatOpen} />
    </div>
  )
}

export default Chat;