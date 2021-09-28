import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CreateList, ListTable } from "~/components/Lists";
import { Button, Checkbox, Dropdown, Table, Typography, message } from "antd";
import { LISTS } from "~/lib/apollo/queries";
import { UPDATE_LIST } from "~/lib/apollo/mutations";
import ListActionMenu from "~/components/Lists/ListTable/ListActionMenu";
import tableStyles from "~/components/Lists/ListTable/ListTable.module.css";
import { MoreOutlined } from "@ant-design/icons";
import { timeAgo, STATUS_ENUM } from "~/lib/utils";
import styles from "~/styles/Home.module.css";

const { Title } = Typography;

function ListsPage({ user }) {
  //   ___  _   _ ___ _____   __
  //  / _ \| | | | __| _ \ \ / /
  // | (_) | |_| | _||   /\ V /
  //  \__\_\\___/|___|_|_\ |_|
  //

  const { loading, data, error } = useQuery(LISTS, {
    skip: !user,
    fetchPolicy: "cache-and-network",
    variables: {
      auth0Id: user?.sub,
    },
  });
  const lists = data?.lists?.items || [];

  //
  // __  __ _   _ _____ _ _____ ___ ___  _  _
  //|  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  //| |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  //|_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
  //
  //
  const [updateList, { error: updateError }] = useMutation(UPDATE_LIST);

  function handleChange(id, data) {
    updateList({
      variables: {
        id,
        data,
      },
    });
  }

  //  ___   _ _____ _     ___ ___ ___ ___
  // |   \ /_\_   _/_\   | _ \ _ \ __| _ \
  // | |) / _ \| |/ _ \  |  _/   / _||  _/
  // |___/_/ \_\_/_/ \_\ |_| |_|_\___|_|
  //
  const columnsToShow = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "55%",
      render: (d, r) => (
        <div className={tableStyles.listItem}>
          <span>{d}</span>
          <span className={tableStyles.timeAgo}>
            {timeAgo(r.lastStatusUpdate)}
          </span>
        </div>
      ),
    },
    {
      title: "Done",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (d, record) => (
        <Checkbox
          onChange={() => {
            let nextStatus =
              STATUS_ENUM[[...STATUS_ENUM].indexOf(record.status) + 1];
            handleChange(record.id, { status: nextStatus });
          }}
          checked={d !== "NOT_STARTED"}
          indeterminate={d === "STARTED"}
        />
      ),
    },
    {
      title: "",
      key: "action",
      align: "right",
      render: (text, record) => (
        <Dropdown
          trigger={["click"]}
          placement="bottomLeft"
          overlay={<ListActionMenu record={record} />}
        >
          <Button type="primary" icon={<MoreOutlined />}></Button>
        </Dropdown>
      ),
    },
  ];

  /**
   *  _    ___ ___ _____ ___ _  _ ___ ___  ___
   * | |  |_ _/ __|_   _| __| \| | __| _ \/ __|
   * | |__ | |\__ \ | | | _|| .` | _||   /\__ \
   * |____|___|___/ |_| |___|_|\_|___|_|_\|___/
   *
   */
  useEffect(() => {
    if (updateError) {
      console.error(updateError);
      message.info("Oops! Something went wrong");
    }
  }, [updateError]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Title level={4}>Main</Title>
        <CreateList user={user} />
        <ListTable lists={lists} columns={columnsToShow} />
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
});

export default ListsPage;
