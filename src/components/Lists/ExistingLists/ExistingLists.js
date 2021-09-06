import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LISTS } from "~/lib/apollo/queries";
import { DELETE_LIST } from "~/lib/apollo/mutations";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;

function ExistingLists() {
  const { loading, data, error } = useQuery(LISTS);
  const [deletingId, setDeletingId] = useState("612842423b91db23be40b6b5");
  const [deleteList, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LIST, {
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

  function handleDelete(id) {
    setDeletingId(id);
    deleteList({
      variables: {
        id: id,
      },
    });
  }

  const dataToUse = data?.lists?.items || [];
  const cards = dataToUse.map((e, i) => (
    <li key={i}>
      {e.name}
      {deleteLoading && deletingId === e._id ? (
        <LoadingOutlined spin />
      ) : (
        <DeleteOutlined onClick={() => handleDelete(e._id)} />
      )}
    </li>
  ));

  return (
    <div>
      <Title level={4}>Lists</Title>
      {loading && <LoadingOutlined spin />}
      <ul>{!loading && data && cards}</ul>
    </div>
  );
}

export default ExistingLists;
