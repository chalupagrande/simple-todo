import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import ListTable from "~/components/Lists/ListTable/ListTable";
import { Typography } from "antd";
import styles from "~/styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { LISTS } from "~/lib/apollo/queries";
const { Title } = Typography;

function ShareListsPage({ user }) {
  const { data, loading, error } = useQuery(LISTS, {
    variables: {
      auth_id: user?.sub,
      filter: {
        author_id: {
          not: user?.sub,
        },
      },
    },
  });

  console.log("DATA", data);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>Shared</Title>
        <ListTable data={data} loading={loading} />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default ShareListsPage;
