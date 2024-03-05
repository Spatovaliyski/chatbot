import React, { FC } from 'react'

import styles from '../chat.module.scss';

interface Props {}

/** 
 * ChatHeader component
 * 
 * @param {Props} props - component props
 * @returns {JSX.Element} - ChatHeader component
 * 
 * @exports ChatHeader
 */
const ChatHeader:FC = (props: Props) => {
  return (
    <header className={styles.chatHeader}>
      <h4 className={styles.chatTitle}>Chatte mit uns</h4>
    </header>
  )
}

export default ChatHeader;