import React from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Search } = Input;
export default function NotSignedIn() {
  return (
    <nav
      className="menu"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: "1",
        top: "0",
      }}
    >
      <div className="menu__logo" style={{ marginTop: "0.4rem", display: "flex", justifyContent:"space-between"}}>
        <Link to="/">
          {navigator.onLine ? (
            <span style={{ color: "#484848" }}>
              <b>QA</b>{" "}
            </span>
          ) : (
            <span style={{ color: "#484848" }}>
              {" "}
              <b>QA</b>
            </span>
          )}
        </Link>
        <Col span={18}>
          <Search placeholder="Search.."/>
        </Col>
        
      </div>
  

      <Menu mode="horizontal" style={{ float: "right"}}>
        <SubMenu title={<UserOutlined style={{fontSize: "1.1rem", color: "grey" }}/>}>
          <Menu.Item style={{ margin: "0px" }}>
            <Link to="/login">{"  "}Login</Link>
          </Menu.Item>
          <Menu.Item style={{ margin: "0px" }}>
            <Link to="/register">{"  "}Register</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </nav>
  );
}
