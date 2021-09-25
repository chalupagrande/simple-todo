import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LISTS } from "~/lib/apollo/queries";
import { DELETE_LIST, UPDATE_LIST_STATUS } from "~/lib/apollo/mutations";
import ListActionMenu from "./ListActionMenu";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, Typography, Table } from "antd";
const { Title } = Typography;
import { timeAgo, STATUS_ENUM, useInterval } from "~/lib/utils";
import styles from "./ListTable.module.css";

function ListTable({ user }) {
  const [count, setCount] = useState(1);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showSubLists, setShowSubLists] = useState(false);
  const { loading, data, error } = useQuery(LISTS, {
    variables: {
      auth0Id: user?.sub,
    },
  });
  const dataToUse = data?.lists?.items || [];

  /**
   *  __  __ _   _ _____ _ _____ ___ ___  _  _
   * |  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
   * | |\/| | |_| | | |/ _ \| |  | | (_) | .` |
   * |_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
   *
   */
  const [
    updateStatus,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_LIST_STATUS);

  function handleChangeStatus(d) {
    let nextStatus = STATUS_ENUM[[...STATUS_ENUM].indexOf(d.status) + 1];
    updateStatus({
      variables: {
        id: d.id,
        status: nextStatus,
      },
    });
  }

  /**
   *  ___   _ _____ _     ___ ___ ___ ___
   * |   \ /_\_   _/_\   | _ \ _ \ __| _ \
   * | |) / _ \| |/ _ \  |  _/   / _||  _/
   * |___/_/ \_\_/_/ \_\ |_| |_|_\___|_|
   *
   */

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
          onChange={() => handleChangeStatus(record)}
          checked={d !== "NOT_STARTED"}
          indeterminate={d === "STARTED"}
        />
      ),
    },
    // {
    //   title: "Last Updated",
    //   dataIndex: "lastStatusUpdate",
    //   key: "lastStatusUpdate",
    //   render: (d) => timeAgo(new Date(d)),
    // },
    // {
    //   title: "Recipe",
    //   dataIndex: "isRecipe",
    //   key: "isRecipe",
    //   render: (d) => <Checkbox checked={d} />,
    // },
    {
      title: "",
      key: "action",
      align: "right",
      render: (text, record) => (
        <Popover placement="left" content={<ListActionMenu record={record} />}>
          <MoreOutlined />
        </Popover>
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
      name: record.isRecipe,
    }),
  };

  // determines how rows are expandable
  const expandable = {
    expandedRowRender: (d) => <p>{d.status}</p>,
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

  return (
    <div>
      {loading && <LoadingOutlined spin />}
      <div className={styles.tableHeader}>
        <Button
          type="primary"
          size="small"
          onClick={() => setShowBulkActions(!showBulkActions)}
        >
          {showBulkActions && "Hide"} Bulk Action
        </Button>
        <Button
          size="small"
          type="primary"
          onClick={() => setShowSubLists(!showSubLists)}
        >
          {showBulkActions ? "Hide" : "Show"} Sublists
        </Button>
      </div>
      <Table
        rowClassName={(d) => (d.status === "COMPLETED" ? styles.completed : "")}
        rowKey={(d) => d.id}
        rowSelection={showBulkActions && rowSelection}
        expandable={showSubLists && expandable}
        columns={columns}
        dataSource={dataToUse}
        size="small"
      ></Table>
    </div>
  );
}

export default ListTable;
