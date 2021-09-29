import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CreateList } from "~/components/Lists";
import RecursiveListTable from "~/components/Lists/ListTable/RecursiveListTable";
import { Typography } from "antd";
import styles from "~/styles/Home.module.css";
const { Title } = Typography;

function ListsPage({ user }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>Main</Title>
        <CreateList user={user} />
        <RecursiveListTable id={null} level={0} user={user} />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default ListsPage;
