import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Modal, Typography, Popconfirm } from "antd";
import { useDebounce } from "~/lib/utils";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SHARE_LIST } from "~/lib/apollo/mutations";
import { ShareAltOutlined } from "@ant-design/icons";
import { USERS } from "~/lib/apollo/queries";
const { Text } = Typography;
const { Option } = AutoComplete;

function ShareListButton({ list }) {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [visible, setVisible] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  //  __  __ _   _ _____ _ _____ ___ ___  _  _
  // |  \/  | | | |_   _/_\_   _|_ _/ _ \| \| |
  // | |\/| | |_| | | |/ _ \| |  | | (_) | .` |
  // |_|  |_|\___/  |_/_/ \_\_| |___\___/|_|\_|
  //

  const [shareList, { loading, data, error }] = useMutation(SHARE_LIST);
  const [
    searchUsers,
    { loading: searchLoading, data: searchData, error: searchError },
  ] = useLazyQuery(USERS);

  function handleShareList() {
    const selectedUser = (searchData.users.items || []).find(
      (e) => e.email === searchTerm
    );

    shareList({
      variables: {
        id: list.id,
        userId: selectedUser.id,
      },
    });
  }

  function handleSearch(v) {
    if (v) {
      searchUsers({
        variables: {
          filter: {
            email: { contains: v },
          },
        },
      });
    }
  }

  // once search comes back, update options
  useEffect(() => {
    if (searchData) {
      const data = (searchData?.users?.items || []).map((e) => ({
        value: e.email,
        label: e.email,
      }));
      setOptions(data);
    }
  }, [searchData]);

  // dont wont to search on every key press.
  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!loading && !error && data && data?.shareList?.success) {
      setSearchTerm("");
      setVisible(false);
    }
  }, [loading, data, error]);

  return (
    <>
      <Modal
        title="Share List"
        visible={visible}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
        cancelText="Cancel"
        footer={null}
        closable={true}
      >
        <p>
          <Text>Search user by email:</Text>
        </p>
        <AutoComplete
          value={searchTerm}
          options={options}
          onChange={(v) => setSearchTerm(v)}
          placeholder="Search User"
          style={{
            width: "200px",
            marginBottom: "1rem",
          }}
        />
        <Text type="secondary">
          <p>
            <strong>Note:</strong> Sharing a list CANNOT be undone. Once a user
            is given access, they will be able to add and edit lists as they
            please.
          </p>
        </Text>
        <Popconfirm
          title="Are you sure you want to share with this user? This cannot be undone."
          onConfirm={handleShareList}
          onCancel={() => setVisible(false)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Share List</Button>
        </Popconfirm>
      </Modal>

      <Button
        type="primary"
        icon={<ShareAltOutlined />}
        onClick={() => setVisible(!visible)}
      >
        Share
      </Button>
    </>
  );
}

export default ShareListButton;
