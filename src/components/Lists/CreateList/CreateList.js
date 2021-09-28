import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Form, Input } from "antd";
import { CREATE_LIST } from "~/lib/apollo/mutations";
import { LIST_FRAGMENT_SHORT } from "~/lib/apollo/fragments";

function CreateList({ user, parentList }) {
  const [form] = Form.useForm();
  const [createList, { loading, error, data }] = useMutation(CREATE_LIST, {
    update(cache, { data: { createList } }) {
      cache.modify({
        fields: {
          lists(existingLists) {
            const newListRef = cache.writeFragment({
              data: createList,
              fragment: LIST_FRAGMENT_SHORT,
            });
            return { items: [...existingLists.items, newListRef] };
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
        user: { ...user, auth0Id: user.sub },
        parentList,
      },
    });
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name" name="name" required>
        <Input placeholder="My cool List" autoComplete="off"></Input>
      </Form.Item>
      <Form.Item name="isRecipe" valuePropName="checked">
        <Checkbox>Is Recipe</Checkbox>
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
