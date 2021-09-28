import React from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Menu } from "antd";
import { DELETE_LIST, UPDATE_LIST } from "~/lib/apollo/mutations";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import styles from "./ListActionMenu.module.css";

function ListActionMenu({ record }) {
  const router = useRouter();

  //
  // __  __ _   _ _____ _ _____ ___ ___  _  _
  //|  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  //| |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  //|_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
  //
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

  const [updateList, { error: updateError }] = useMutation(UPDATE_LIST);

  //  _  _   _   _  _ ___  _    ___ ___  ___
  // | || | /_\ | \| |   \| |  | __| _ \/ __|
  // | __ |/ _ \| .` | |) | |__| _||   /\__ \
  // |_||_/_/ \_\_|\_|___/|____|___|_|_\|___/
  //

  function handleDelete() {
    deleteList({
      variables: {
        id: record.id,
      },
    });
  }

  function handleChange(vars) {
    updateList({
      variables: {
        id: record.id,
        data: vars,
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
      <Menu.Item
        icon={<EditOutlined />}
        onClick={() => router.push(`/lists/${record.id}`)}
      >
        Edit
      </Menu.Item>
      {!record.isRecipe && (
        <Menu.Item
          icon={<SnippetsOutlined />}
          onClick={() => handleChange({ isRecipe: true })}
        >
          Make Recipe
        </Menu.Item>
      )}
      {record.isRecipe && <Menu.Item>Manage</Menu.Item>}
    </Menu>
  );
}

export default ListActionMenu;
