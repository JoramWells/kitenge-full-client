import React from "react";
import { Row, Col, Typography, Space } from "antd";
import mpesa from "../img/mpesa.png";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <footer
    className="footer"

    >
      <Row
        justify="space-around"
        align="middle"
        style={{
          height: "350px",
          padding: "2rem",
          backgroundColor: "rgb(40,44,53)",
          color: "white",
        }}
      >
        <Col>
          <Title level={4} style={{ color: "white" }}>
            Social media
          </Title>
          <br />
          <Space>
            <TwitterOutlined style={{ fontSize: "2rem", color: "#4da6ff" }} />{" "}
            <FacebookOutlined style={{ fontSize: "2rem", color: "#3366ff" }} />{" "}
            <InstagramOutlined style={{ fontSize: "2rem", color: "#ff8533" }} />{" "}
          </Space>
        </Col>
        <Col>
          <Title level={4} style={{ color: "white" }}>
            Buy
          </Title>
          <Text style={{ color: "white" }}>Shop products</Text>
          <br />
          <Text style={{ color: "white" }}>Shipping</Text>
          <br />
          <Text style={{ color: "white" }}>Track your order</Text>
          <br />
          <Text style={{ color: "white" }}>Buyers FAQs</Text>
          <br />
          <Text style={{ color: "white" }}>Contact us</Text>
        </Col>
        <Col>
          <Title level={4} style={{ color: "white" }}>
            Sell
          </Title>
          <Text style={{ color: "white" }}>Quickstart guide</Text>
          <br />
          <Text style={{ color: "white" }}>Sell anything</Text>
          <br />
          <Text style={{ color: "white" }}>Products</Text>
          <br />
          <Text style={{ color: "white" }}>Start selling</Text>
          <br />
          <Text style={{ color: "white" }}>Login</Text>
        </Col>
        <Col>
          <Title level={4} style={{ color: "white", textAlign: "center" }}>
            Payments
          </Title>
          <img src={mpesa} alt="mpesa logo" width="180px" height="auto" />
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "rgb(22,22,29)",
          padding: "1rem",
          textAlign: "center",
          color: "white",
        }}
      >
        @2021-Copyright | Annies` Online Mall | Privary Policy | Terms &
        Conditions
      </div>
    </footer>
  );
}
