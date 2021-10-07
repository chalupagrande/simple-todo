import React from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Menu, message } from "antd";
import { DELETE_LIST, UPDATE_LIST } from "~/lib/apollo/mutations";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import styles from "./ListActionMenu.module.css";

function ListActionMenu({ record, level }) {
  const router = useRouter();

  // __  __ _   _ _____ _ _____ ___ ___  _  _
  // |  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  // | |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  // |_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
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
        key={1}
        onClick={handleDelete}
        icon={loading ? <LoadingOutlined spin /> : <DeleteOutlined />}
      >
        Delete
      </Menu.Item>
      <Menu.Item
        key={2}
        icon={<SnippetsOutlined />}
        onClick={() => router.push(`/lists/${record.id}`)}
      >
        Manage
      </Menu.Item>
      {record.is_parent && (
        <>
          <Menu.Item
            key={3}
            icon={<SnippetsOutlined />}
            onClick={() => router.push(`/lists/${record.id}`)}
          >
            Mark all as DONE
          </Menu.Item>
          <Menu.Item
            key={4}
            icon={<SnippetsOutlined />}
            onClick={() => router.push(`/lists/${record.id}`)}
          >
            Mark all as NOT DONE
          </Menu.Item>
        </>
      )}
      <Menu.Item
        key={5}
        icon={<EditOutlined />}
        onClick={() =>
          message.info(
            "This dont work yet. Should make name a dialog box for editing"
          )
        }
      >
        Edit
      </Menu.Item>
    </Menu>
  );
}

export default ListActionMenu;
