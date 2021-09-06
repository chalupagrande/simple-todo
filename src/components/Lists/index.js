import React from "react";
import ExistingLists from "./ExistingLists";
import CreateList from "./CreateList";
import { Row, Col } from "antd";

function Lists({ user }) {
  return (
    <div>
      <Row>
        <Col span={12}>
          <ExistingLists />
        </Col>
        <Col span={12}>
          <CreateList user={user} />
        </Col>
      </Row>
    </div>
  );
}
export default Lists;
