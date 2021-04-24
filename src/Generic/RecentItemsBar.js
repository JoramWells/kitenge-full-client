import React from "react";
import { Row, Col } from "antd";

export default function RecentItemsBar(props) {
  return (
    <Row
      style={{
        backgroundColor: "#d9d9d9",
        margin: "2rem",
        paddingTop: "0.3rem",
      }}
      justify="space-around"
      align="middle"
    >
      <Col>
        <h2>{props.title}</h2>
      </Col>
    </Row>
  );
}
