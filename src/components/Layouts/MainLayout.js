import React from "react";
import Navigation from "~/components/Navigation";
import styles from "./styles.module.css";

function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      {children}
    </div>
  );
}

export default Layout;
