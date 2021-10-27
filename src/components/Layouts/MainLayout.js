import React, { useEffect, useState } from "react";
import ls from "local-storage";
import { useLazyQuery } from "@apollo/client";
import { CHECK_USER } from "~/lib/apollo/queries";
import { Affix, Drawer, Layout, Spin } from "antd";
import Navigation from "~/components/Navigation";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { useWindowSize } from "~/lib/utils";
import { LOCAL_STORAGE_MAIN_LIST, LOCAL_STORAGE_USER } from "~/config";
const { Sider, Content } = Layout;

function MainLayout({ children }) {
  const [visible, setVisible] = useState(false);
  const [collapseWidth, setCollapseWidth] = useState(48);
  const { user } = useUser();
  const [checkUser, { loading, data, error }] = useLazyQuery(CHECK_USER);
  const windowSize = useWindowSize();

  const loggedInUser = ls.get(LOCAL_STORAGE_USER);
  const main = ls.get(LOCAL_STORAGE_MAIN_LIST);

  // gets info of logged in user
  useEffect(() => {
    if (user) {
      checkUser({
        variables: {
          user: { ...user, auth_id: user.sub },
        },
      });
    }
  }, [user]);

  // sets Local storage with logged in user
  useEffect(() => {
    if (data && !loading && !error) {
      const {
        checkUser: { main, user },
      } = data;
      ls.set(LOCAL_STORAGE_USER, user);
      ls.set(LOCAL_STORAGE_MAIN_LIST, main);
    }
  }, [data]);

  return (
    <Layout>
      <Layout className={styles.wrapper}>
        <Content>{children}</Content>
      </Layout>
      <Affix
        style={{
          position: "absolute",
          bottom: 30,
          right: !visible ? 0 + collapseWidth : 200,
          padding: "0.5rem",
          backgroundColor: "white",
          transition: "right 0.2s ease-in-out",
          boxShadow:
            "-6px 0 16px -8px rgb(0 0 0 / 8%), -9px 0 28px 0 rgb(0 0 0 / 5%), -12px 0 48px 16px rgb(0 0 0 / 3%)",
        }}
      >
        <div>
          <MenuOutlined
            style={{ fontSize: 32 }}
            onClick={() => setVisible(!visible)}
          />
        </div>
      </Affix>
      {windowSize.width > 700 ? (
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth={collapseWidth}
          collapsed={!visible}
          onBreakpoint={(broken) => {
            setCollapseWidth(!broken ? 48 : 0);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Navigation user={user} />
        </Sider>
      ) : (
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          mask={true}
          width={200}
        >
          <Navigation user={user} />
        </Drawer>
      )}
    </Layout>
  );
}

export default MainLayout;
