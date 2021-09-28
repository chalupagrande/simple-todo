import Head from "next/head";
import styles from "~/styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { CreateList, ListTable } from "~/components/Lists";
import { Typography } from "antd";
const { Title } = Typography;
import { RECIPES } from "~/lib/apollo/queries";

export default function Home() {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>Recipes</Title>
        <ListTable
          user={user}
          query={RECIPES}
          columns={["name", "status", "action"]}
        />
      </main>
    </div>
  );
}
