import React from "react";
import Link from "next/link";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShareAltOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function Navigation({ user }) {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ margin: 0, padding: 0 }}
    >
      {user ? (
        <>
          <Menu.Item key="1" icon={<OrderedListOutlined />}>
            <Link href="/lists">Main</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<MenuUnfoldOutlined />}>
            <Link href="/recipes">Recipes</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShareAltOutlined />}>
            <Link href="/shared">Shared</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link href="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            <a href="/api/auth/logout">Logout</a>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="6" icon={<LoginOutlined />}>
          <a href="/api/auth/login">Login</a>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default Navigation;
