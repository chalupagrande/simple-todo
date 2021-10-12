import React, { useState } from "react";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";

function Navigation({ user }) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function close() {
    setOpen(false);
  }

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["4"]}
      style={{ margin: 0, padding: 0 }}
    >
      {user ? (
        <>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link href="/recipes">Recipes</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link href="/lists">Lists</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link href="/shared">Shared</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <a href="/api/auth/logout">Logout</a>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="6" icon={<UserOutlined />}>
          <a href="/api/auth/login">Login</a>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Navigation;
