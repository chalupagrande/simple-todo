import React, { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CreateList } from "~/components/Lists";
import RecursiveListTable from "~/components/Lists/ListTable/RecursiveListTable";
import ShareListButton from "~/components/Lists/ShareListButton";
import { Typography } from "antd";
import styles from "~/styles/Home.module.css";
const { Title } = Typography;

function ListsPage({ user }) {
  const [parent, setParent] = useState();
  const router = useRouter();
  const { query } = router;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>{parent?.name || "List"}</Title>
        <CreateList user={user} parentList={parent} />
        <ShareListButton list={parent} />
        <RecursiveListTable
          id={query.listId}
          level={0}
          user={user}
          setParent={setParent}
        />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default ListsPage;
