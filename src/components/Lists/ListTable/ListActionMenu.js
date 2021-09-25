import React from "react";
import { useMutation } from "@apollo/client";
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
    <ul className={styles.listActionMenu}>
      <li onClick={handleDelete}>
        {loading ? <LoadingOutlined spin /> : <DeleteOutlined />} Delete
      </li>
      <li>
        <EditOutlined /> Edit
      </li>
      {!record.isRecipe && (
        <li>
          <SnippetsOutlined /> Make Recipe
        </li>
      )}
    </ul>
  );
}

export default ListActionMenu;
