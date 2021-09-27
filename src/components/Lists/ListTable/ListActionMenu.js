import React from "react";
import { useMutation } from "@apollo/client";
import { Menu } from "antd";
import { DELETE_LIST } from "~/lib/apollo/mutations";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import styles from "./ListActionMenu.module.css";

function ListActionMenu({ record }) {
  const [deleteList, { loading, data, error }] = useMutation(DELETE_LIST, {
    update(cache) {
      cache.modify({
        fields: {
          lists(existingLists, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  function handleDelete() {
    deleteList({
      variables: {
        id: record.id,
      },
    });
  }

  console.log(loading, data, error);

  return (
    <Menu className={styles.listActionMenu}>
      <Menu.Item
        onClick={handleDelete}
        icon={loading ? <LoadingOutlined spin /> : <DeleteOutlined />}
      >
        Delete
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>Edit</Menu.Item>
      {!record.isRecipe && (
        <Menu.Item icon={<SnippetsOutlined />}>Make Recipe</Menu.Item>
      )}
      {record.isRecipe && <Menu.Item>Manage</Menu.Item>}
    </Menu>
  );
}

export default ListActionMenu;
