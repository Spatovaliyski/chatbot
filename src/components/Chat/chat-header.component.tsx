'use client'

import React, { FC } from 'react'

import styles from './chat.module.scss';

interface Props { }

const ChatHeader:FC = (props: Props) => {
  return (
    <header className={styles.chatHeader}>
      <h4 className={styles.chatTitle}>Chatte mit uns</h4>
    </header>
  )
}

export default ChatHeader;