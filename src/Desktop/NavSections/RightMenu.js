import React, { useState } from "react";
import {
  Menu,
  Space,
  Badge,
  Modal,
  Col,
  Row,
  Typography,
  Image,
  message,
  Button,
} from "antd";
import Cookie from "js-cookie";
import { withRouter, Link, useHistory } from "react-router-dom";
import {
  EditOutlined,
  MailOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";

const { Text, Title } = Typography;
const { SubMenu } = Menu;
// const cartItems = Cookie.getJSON("cartItems");

function RightMenu(props) {
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const CartItems = useSelector((state) => state.cart);
  const { cartItems } = CartItems;
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  //   const PaymentList = useSelector((state) => state.paymentList);
  //   const { payments } = PaymentList;
  function login() {
    props.history.push("/login");
  }
  function register() {
    props.history.push("/register");
  }

  function showModal() {
    setVisible(true);
  }
  function logout() {
    if (!userInfo) {
      console.log();
    }
    Cookie.remove("userInfo");
    setTimeout(message.success("Logged out successfully"), 1000);
    history.goBack();
  }

  function handleOk() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  if (!userInfo) {
    return (
      <Menu mode="horizontal" style={{ paddingTop: "0.4rem" }}>
        <Menu.Item key="mail" style={{ style: "none" }}>
          <Button style={{ borderRadius: "5px" }} onClick={login}>
            Sign In
          </Button>
        </Menu.Item>
        <Menu.Item key="app">
          <Button style={{ borderRadius: "5px" }} onClick={register}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
    );
  } else {
    if (cartItems.length === 0) {
      return (
        <Space>
          <Menu mode="horizontal">
            <SubMenu
              title={
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.5rem", margin: "0", color: "grey" }}
                />
              }
            ></SubMenu>

            <SubMenu
              title={
                <QuestionCircleOutlined
                  style={{ fontSize: "1.3rem", color: "grey" }}
                />
              }
            >
              <Menu.Item style={{ margin: "0px" }}>Contact supplier</Menu.Item>
              <Menu.Item style={{ margin: "0px" }}>
                How to add product
              </Menu.Item>
              <Menu.Item>Creating account</Menu.Item>
              <Menu.Item>Tracking your order</Menu.Item>
            </SubMenu>
            <SubMenu
              style={{ borderRadius: "10px", marginLeft: "0" }}
              title={
                <SettingOutlined
                  style={{ fontSize: "1.3rem", margin: "0", color: "grey" }}
                />
              }
            >
              <Menu.Item icon={<PlusOutlined />}>
                <Link to="/products/add">Add Product</Link>
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />}>
                <Link to="/produc/manage">Edit Product</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              style={{ marginLeft: "0" }}
              title={
                <Avatar
                  src={userInfo.avatar}
                  style={{
                    width: "25px",
                    height: "auto",
                    marginBottom: "0.5rem",
                    marginLeft: "0",
                  }}
                />
              }
            >
              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
            </SubMenu>
          </Menu>
        </Space>
      );
    } else {
      return (
        <Space>
          <Menu mode="horizontal">
            <Menu.Item>
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.4rem", margin: "0", color: "grey" }}
                />
              </Badge>
            </Menu.Item>
            <Menu.Item>
              <Badge dot count={cartItems.length}>
                <MailOutlined
                  style={{ fontSize: "1.3rem", margin: "0", color: "grey" }}
                />
              </Badge>
            </Menu.Item>

            <SubMenu
              title={
                <QuestionCircleOutlined
                  style={{ fontSize: "1.3rem", color: "grey" }}
                />
              }
            >
              <Menu.Item style={{ margin: "0px" }}>Contact supplier</Menu.Item>
              <Menu.Item style={{ margin: "0px" }}>
                How to add product
              </Menu.Item>
              <Menu.Item>Creating account</Menu.Item>
              <Menu.Item>Tracking your order</Menu.Item>
            </SubMenu>
            <SubMenu
              style={{ borderRadius: "10px", marginLeft: "0" }}
              title={
                <SettingOutlined
                  style={{ fontSize: "1.3rem", color: "grey" }}
                />
              }
            >
              <Menu.Item icon={<PlusOutlined />}>
                <Link to="/products/add">Add Product</Link>
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />}>
                <Link to="/produc/manage">Edit Product</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              style={{ marginLeft: "0" }}
              title={
                <Avatar
                  src={userInfo.avatar}
                  style={{
                    marginBottom: "0.5rem",
                    width: "25px",
                    height: "inherit",
                  }}
                />
              }
            >
              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item
                style={{
                  justifyContent: "space-around",
                  display: "flex",
                  margin: "0",
                }}
              >
                <Button style={{ borderRadius: "50px" }}>
                  <Link to="/register">Manage account</Link>
                </Button>
              </Menu.Item>

              <Menu.Item
                style={{
                  justifyContent: "space-around",
                  display: "flex",
                  margin: "0",
                }}
              >
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
            {cartItems.map((product) => (
              <Row justify="space-around" align="middle" key={product.image}>
                <Col>
                  <Image
                    src={"/" + product.image}
                    alt="profile_pic"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                <Col>
                  <Title level={3}>{product.qty}</Title>
                </Col>
                <Col key={product.product}>
                  <Text>{product.price}</Text>
                </Col>
              </Row>
            ))}
          </Modal>
        </Space>
      );
    }
  }
}

export default withRouter(RightMenu);
