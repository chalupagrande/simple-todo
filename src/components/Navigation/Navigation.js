import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import styles from "./styles.module.css";
import { Button, Drawer, Typography } from "antd";
const { Title } = Typography;

function Navigation() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  return (
    <nav className={styles.menu}>
      <div className={styles.menuButton}>
        {open ? (
          <Button type="primary" onClick={toggleOpen}>
            Close
          </Button>
        ) : (
          <Button type="primary" onClick={toggleOpen}>
            Menu
          </Button>
        )}
      </div>
      <Title className={styles.menuTitle} level={2}>
        TODO
      </Title>
      <Drawer placement="left" closable={true} onClose={close} visible={open}>
        <ul className={styles.navigation}>
          <li>
            <Button type="primary" onClick={close}>
              <Link href="/">Home</Link>
            </Button>
          </li>
          {user ? (
            <>
              <li>
                <Button type="primary" onClick={close}>
                  <Link href="/recipes">Recipes</Link>
                </Button>
              </li>
              <li>
                <Button type="primary" onClick={close}>
                  <Link href="/lists">Lists</Link>
                </Button>
              </li>
              <li>
                <Button type="primary" onClick={close}>
                  <Link href="/shared">Shared</Link>
                </Button>
              </li>
              <li>
                <Button type="primary" onClick={close}>
                  <Link href="/profile">Profile</Link>
                </Button>
              </li>
              <li>
                <Button type="primary" onClick={close}>
                  <a href="/api/auth/logout">Logout</a>
                </Button>
              </li>
            </>
          ) : (
            <li>
              <a href="/api/auth/login">Login</a>
            </li>
          )}
        </ul>
      </Drawer>
    </nav>
  );
}

export default Navigation;
