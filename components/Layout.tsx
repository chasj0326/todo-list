import React from "react";
import styles from "../styles/Layout.module.css"
import Header from "./Header"

type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({children} : LayoutProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <Header/>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </div>
  )
}

