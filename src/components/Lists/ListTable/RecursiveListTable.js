import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LIST } from "~/lib/apollo/queries";
import { UPDATE_LIST } from "~/lib/apollo/mutations";
import { Alert, Button, Checkbox, Dropdown, Table, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { timeAgo, STATUS_ENUM, useInterval } from "~/lib/utils";
import ListActionMenu from "~/components/Lists/ListTable/ListActionMenu";
import styles from "./ListTable.module.css";
import PropTypes from "prop-types";

function RecursiveListTable({
  id,
  user,
  level,
  setParent,
  QUERY,
  showNestedLists,
  itemsAccessorFunction,
}) {
  const [count, setCount] = useState(1);

  //   ___  _   _ ___ _____   __
  //  / _ \| | | | __| _ \ \ / /
  // | (_) | |_| | _||   /\ V /
  //  \__\_\\___/|___|_|_\ |_|
  //

  const { loading, data, error } = useQuery(QUERY || LIST, {
    skip: !user,
    fetchPolicy: "cache-and-network",
    variables: {
      id,
      filter: !id
        ? {
            AND: [{ author: { equals: user?.sub } }, { is_default: true }],
          }
        : undefined,
    },
  });
  const items = itemsAccessorFunction(data);

  // __  __ _   _ _____ _ _____ ___ ___  _  _
  // |  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  // | |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  // |_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
  //

  const [updateList, { error: updateError }] = useMutation(UPDATE_LIST);

  //  _  _   _   _  _ ___  _    ___ ___  ___
  // | || | /_\ | \| |   \| |  | __| _ \/ __|
  // | __ |/ _ \| .` | |) | |__| _||   /\__ \
  // |_||_/_/ \_\_|\_|___/|____|___|_|_\|___/
  //

  function handleStatusChange(id, data) {
    updateList({
      variables: {
        id,
        data,
      },
    });
  }

  function markAllAsDone(record) {
    alert("TODO: make all immediate sublists as DONE");
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
      title: "Done",
      dataIndex: "status",
      key: "right",
      align: "center",
      render: (d, record) => (
        <Checkbox
          onChange={() => {
            const nextStatus =
              STATUS_ENUM[[...STATUS_ENUM].indexOf(record.status) + 1];
            handleStatusChange(record.id, { status: nextStatus });
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
      disabled: record.is_parent, // Column configuration not to be checked
    }),
  };

  // determines how rows are expandable
  const expandable = {
    expandedRowRender: (d) => (
      <RecursiveListTable id={d.id} user={user} level={level + 1} />
    ),
    rowExpandable: (d) => d.is_parent,
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
      setParent(data?.list);
    }
  }, [data, setParent]);

  //  ___ ___ _  _ ___  ___ ___
  // | _ \ __| \| |   \| __| _ \
  // |   / _|| .` | |) | _||   /
  // |_|_\___|_|\_|___/|___|_|_\
  //
  if (level > 5) {
    return (
      <Alert message="You've gone too many layers deep! Try 'managing' one of the nested lists that contain this one to see its contents." />
    );
  }

  return (
    <Table
      rowClassName={(d) => (d.status === "COMPLETED" ? styles.completed : "")}
      rowKey={(d) => d.id}
      rowSelection={rowSelection}
      expandable={showNestedLists && expandable}
      columns={columns}
      dataSource={items}
      loading={loading}
      showHeader={level === 0}
      pagination={{
        position: [],
      }}
      size="small"
    />
  );
}

RecursiveListTable.defaultProps = {
  level: 0,
  showNestedLists: true,
  itemsAccessorFunction: (d) => d?.list?.children?.items || [],
};

RecursiveListTable.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
  level: PropTypes.number,
  setParent: PropTypes.func,
  // QUERY: PropTypes.
  showNestedLists: PropTypes.bool,
  itemsAccessorFunction: PropTypes.func.isRequired,
};

export default RecursiveListTable;
