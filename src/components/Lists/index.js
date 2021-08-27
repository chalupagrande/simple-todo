import React from "react";
import ExistingLists from "./ExistingLists";
import CreateList from "./CreateList";
import { Row, Col } from "antd";

function Lists() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <ExistingLists />
        </Col>
        <Col span={12}>
          <CreateList />
        </Col>
      </Row>
    </div>
  );
}
export default Lists;
