import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Form, Input } from "antd";
import { CREATE_LIST } from "~/lib/apollo/mutations";
import { LIST_FRAGMENT_SHORT } from "~/lib/apollo/fragments";

function CreateList({ user, parentList }) {
  const [form] = Form.useForm();
  const [createList, { loading, error, data }] = useMutation(CREATE_LIST, {
    update(cache, { data: { createList } }) {
      console.log("CREATE LIST", createList);
      cache.modify({
        fields: {
          list(existingLists) {
            const newListRef = cache.writeFragment({
              data: createList,
              fragment: LIST_FRAGMENT_SHORT,
            });
            return newListRef;
          },
        },
      });
    },
  });

  function handleSubmit(values) {
    form.resetFields();
    createList({
      variables: {
        data: {
          ...values,
        },
        user: { ...user, auth_id: user.sub },
        parentList,
      },
    });
  }

  return (
    <Form form={form} layout="horizontal" onFinish={handleSubmit}>
      <Form.Item label="Add Item" name="name" required>
        <Input placeholder="My cool List" autoComplete="off"></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateList;
