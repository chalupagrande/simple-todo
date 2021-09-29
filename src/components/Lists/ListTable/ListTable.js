import React, { useState } from "react";
import { Button, Table } from "antd";
import { useInterval } from "~/lib/utils";
import styles from "./ListTable.module.css";

function ListTable({ lists, columns, expandable }) {
  const [count, setCount] = useState(1);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showSubLists, setShowSubLists] = useState(false);

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
  // const expandable = {
  //   expandedRowRender: (d) => <p>{d.status}</p>,
  //   rowExpandable: (d) => d.isRecipe,
  // };

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
          {!!showBulkActions ? "Hide" : "Show"} Sublists
        </Button>
      </div>
      <Table
        rowClassName={(d) => (d.status === "COMPLETED" ? styles.completed : "")}
        rowKey={(d) => d.id}
        rowSelection={showBulkActions && rowSelection}
        expandable={showSubLists && expandable}
        columns={columns}
        dataSource={lists}
        size="small"
      ></Table>
    </div>
  );
}

export default ListTable;
