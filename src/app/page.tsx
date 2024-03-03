import Image from "next/image";
import styles from "./page.module.css";
import Chat from "@/components/Chat/chat.component";

export default function Home() {
  return (
    <main className={styles.main}>
      <Chat />
    </main>
  );
}
