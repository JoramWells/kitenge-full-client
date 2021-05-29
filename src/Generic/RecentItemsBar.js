import React from "react";
import { Row, Col } from "antd";

export default function RecentItemsBar(props) {
  return (
    <Row justify="center" align="middle">
      <Col
        span={19}
        style={{
          backgroundColor: "#dee3e3",
          padding: " 0.4rem 0 0.09rem 1rem ",
          marginTop: "2rem",
        }}
      >
        <h3 style={{ color: "#5d5d5a" }}>{props.title}</h3>
      </Col>
    </Row>
  );
}
