import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "./styles.module.css";

function Navigation() {
  const { user } = useUser();
  console.log("USER", user);

  return (
    <nav>
      <ul className={styles.navigation}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <a href="/api/auth/logout">Logout</a>
            </li>
          </>
        ) : (
          <li>
            <Link href="/api/auth/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
