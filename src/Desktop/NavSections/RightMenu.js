import React, { useState } from "react";
import { message } from "antd";
import Cookie from "js-cookie";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { MailIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import SignedInDropdown from "./SignedInDropdown";

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

  if (!userInfo) {
    return (
      <div
        className="hover:cursor-pointer py-1 px-4 border  focus:outline-none rounded-md text-gray-900 font-semibold text-lg"
        onClick={login}
      >
        Login
      </div>
    );
  } else {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-row justify-center items-center content-center">
          <MailIcon className="h-10 p-2 text-gray-400" />
          <ShoppingCartIcon className="h-10 p-2 text-gray-400" />

          <img
            src={userInfo.avatar}
            alt="logo"
            loading="lazy"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50px",
            }}
          />
          {/* <SignedInDropdown /> */}
          {/* <Menu mode="horizontal">
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
          </Menu> */}
        </div>
      );
    } else {
      return (
        <>
          <img
            src={userInfo.avatar}
            alt={userInfo.avatar}
            loading="lazy"
            style={{
              width: "27px",
              height: "27px",
              borderRadius: "50px",
              marginTop: ".65rem",
            }}
          />

          {/* <Menu mode="horizontal">
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
          </Modal> */}
        </>
      );
    }
  }
}

export default withRouter(RightMenu);
