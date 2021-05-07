import React from "react";
import { Row, Col } from "antd";

export default function RecentItemsBar(props) {
  return (
    <Row
      style={{
        backgroundColor: "#d9d9d9",
        margin: "1rem",
        paddingTop: "0.3rem",
      }}
      justify="space-around"
      align="middle"
    >
      <Col>
        <h3>{props.title}</h3>
      </Col>
    </Row>
  );
}
