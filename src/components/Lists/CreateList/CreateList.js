import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Typography } from "antd";
const { Title } = Typography;
import { CREATE_LIST } from "~/lib/apollo/mutations";
import { ListFragment } from "~/lib/apollo/queries";

function CreateList() {
  const [form] = Form.useForm();
  const [createList, { loading, error, data }] = useMutation(CREATE_LIST, {
    update(cache, { data: { createList } }) {
      cache.modify({
        fields: {
          lists(existingLists) {
            const newListRef = cache.writeFragment({
              data: createList,
              fragment: ListFragment,
            });
            return { items: [...existingLists.items, newListRef] };
          },
        },
      });
    },
  });

  function handleSubmit(values) {
    console.log("DONE", values);
    createList({ variables: values });
  }

  console.log("DATA", loading, error, data);

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Title level={4}>Create New List</Title>
      <Form.Item label="Name" name="name" required>
        <Input placeholder="My cool List"></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateList;
