import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "~/styles/Home.module.css";
import RecursiveListTable from "~/components/Lists/ListTable/RecursiveListTable";
import { Typography } from "antd";
import { RECIPES } from "~/lib/apollo/queries";
const { Title } = Typography;

function Recipes({ user }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>Recipes</Title>
        <RecursiveListTable
          QUERY={RECIPES}
          level={0}
          user={user}
          itemsAccessorFunction={(d) => d?.lists?.items || []}
        />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default Recipes;
