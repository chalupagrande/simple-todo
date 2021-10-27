import React from "react";
import { Button, Dropdown, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { timeAgo, STATUS_ENUM, useInterval } from "~/lib/utils";
import ListActionMenu from "~/components/Lists/ListTable/ListActionMenu";
import styles from "./ListTable.module.css";
import PropTypes from "prop-types";

function ListTable({ data, loading }) {
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
      width: "80%",
      render: (d, r) => (
        <div className={styles.listItem}>
          <span>{d}</span>
          <span className={styles.timeAgo}>
            {r.last_status_update ? timeAgo(r.last_status_update) : "--"}
          </span>
        </div>
      ),
    },
    {
      title: "By",
      dataIndex: "author",
      key: "author",
      render: (d, r) => d?.name,
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
      disabled: record.is_parent, // Column configuration not to be checked
    }),
  };

  /**
   *  _    ___ ___ _____ ___ _  _ ___ ___  ___
   * | |  |_ _/ __|_   _| __| \| | __| _ \/ __|
   * | |__ | |\__ \ | | | _|| .` | _||   /\__ \
   * |____|___|___/ |_| |___|_|\_|___|_|_\|___/
   *
   */

  //  ___ ___ _  _ ___  ___ ___
  // | _ \ __| \| |   \| __| _ \
  // |   / _|| .` | |) | _||   /
  // |_|_\___|_|\_|___/|___|_|_\

  return (
    <Table
      rowClassName={(d) => (d.status === "COMPLETED" ? styles.completed : "")}
      rowKey={(d) => d.id}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data?.lists?.items || []}
      loading={loading}
      size="small"
    />
  );
}

ListTable.defaultProps = {
  data: [],
  loading: false,
};

ListTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
};

export default ListTable;
