'use client';

import React, { FC, useState } from 'react'

import styles from './chat.module.scss'
import ChatHeader from './chat-header.component'
import ChatBubble from './chat-bubble.component'
import ChatBody from './chat-body.component';

type Props = {}

const Chat: FC = (props: Props) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chat}>
        <ChatHeader />
        <ChatBody />
      </div>

      <ChatBubble setChatOpen={setChatOpen}/>
    </div>
  )
}

export default Chat;