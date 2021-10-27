import React, { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import CreateList from "~/components/Lists/CreateList";
import RecursiveListTable from "~/components/Lists/ListTable/RecursiveListTable";
import { Typography } from "antd";
import styles from "~/styles/Home.module.css";
import ls from "local-storage";
import { LOCAL_STORAGE_MAIN_LIST } from "~/config";
const { Title } = Typography;

function ListsPage({ user }) {
  const [parent, setParent] = useState();

  useEffect(() => {
    const main = ls.get(LOCAL_STORAGE_MAIN_LIST);
    setParent(main);
  }, [false]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>{parent?.name || "Main"}</Title>
        <CreateList user={user} parentList={parent} />
        {parent && (
          <RecursiveListTable parentListId={parent.id} level={0} user={user} />
        )}
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default ListsPage;
