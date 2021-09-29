import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LISTS } from "~/lib/apollo/queries";
import { UPDATE_LIST } from "~/lib/apollo/mutations";
import { Alert, Button, Checkbox, Dropdown, Table, message } from "antd";
import { CircularProgress, MoreOutlined } from "@ant-design/icons";
import { timeAgo, STATUS_ENUM, useInterval } from "~/lib/utils";
import ListActionMenu from "~/components/Lists/ListTable/ListActionMenu";
import styles from "./ListTable.module.css";

function RecursiveListTable({ id, user, level, setParent }) {
  const [count, setCount] = useState(1);
  console.log("ID", id);

  //   ___  _   _ ___ _____   __
  //  / _ \| | | | __| _ \ \ / /
  // | (_) | |_| | _||   /\ V /
  //  \__\_\\___/|___|_|_\ |_|
  //

  const { loading, data, error } = useQuery(LISTS, {
    skip: !user,
    fetchPolicy: "cache-and-network",
    variables: {
      id,
      auth0Id: user?.sub,
    },
  });
  const lists = data?.lists?.items || [];

  //
  // __  __ _   _ _____ _ _____ ___ ___  _  _
  // |  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  // | |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  // |_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "55%",
      render: (d, r) => (
        <div className={styles.listItem}>
          <span>{d}</span>
          <span className={styles.timeAgo}>{timeAgo(r.lastStatusUpdate)}</span>
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
            const nextStatus =
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

  // determines how rows are selected
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.isRecipe, // Column configuration not to be checked
    }),
  };

  // determines how rows are expandable
  const expandable = {
    expandedRowRender: (d) => (
      <RecursiveListTable id={d.id} user={user} level={level + 1} />
    ),
    rowExpandable: (d) => d.isRecipe,
  };

  /**
   *  _    ___ ___ _____ ___ _  _ ___ ___  ___
   * | |  |_ _/ __|_   _| __| \| | __| _ \/ __|
   * | |__ | |\__ \ | | | _|| .` | _||   /\__ \
   * |____|___|___/ |_| |___|_|\_|___|_|_\|___/
   *
   */

  useInterval(() => {
    setCount(count + 1);
  }, 60000);

  useEffect(() => {
    if (updateError) {
      message.info("Oops! There was an error");
      console.error(updateError);
    }
  }, [updateError]);

  useEffect(() => {
    if (data && setParent) {
      setParent(data?.lists?.parent);
    }
  }, [data, setParent]);

  //  ___ ___ _  _ ___  ___ ___
  // | _ \ __| \| |   \| __| _ \
  // |   / _|| .` | |) | _||   /
  // |_|_\___|_|\_|___/|___|_|_\
  //
  if (level > 5) {
    return <p>Too Deep</p>;
  }

  return (
    <Table
      rowClassName={(d) => (d.status === "COMPLETED" ? styles.completed : "")}
      rowKey={(d) => d.id}
      rowSelection={rowSelection}
      expandable={expandable}
      columns={columns}
      dataSource={lists}
      loading={loading}
      showHeader={level === 0}
      pagination={{
        position: [],
      }}
      size="small"
    />
  );
}

export default RecursiveListTable;
