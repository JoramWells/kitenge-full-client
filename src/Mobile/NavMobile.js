import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Badge, Col, Image, Row, Modal, Table, Input } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn";
import NotCartItems from "./NotCartItems";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image
        src={"/" + img}
        alt="image file"
        style={{ width: "50px", height: "50px", objectFit: "contain" }}
      />
    ),
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];

const { SubMenu } = Menu;
const { Search } = Input;
export default function NavMobile(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const CartItems = useSelector((state) => state.cart);
  const { cartItems } = CartItems;

  const [visible, setVisible] = useState(false);
  const [diVisible, setDiVisible] = useState("visible");
  const [diVisible1, setDiVisible2] = useState("hidden");
  const {isToggleData,setToggle} = useState(false)

  function handleOk() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }
  function showModal() {
    setVisible(true);
  }
  function showDiv() {
    setDiVisible("hidden");
    setDiVisible2("visible");
  }
  function hideDiv() {
    setDiVisible("visible");
    setDiVisible2("hidden");
  }

  if (!userInfo) return <NotSignedIn />;
  else {
    if (!cartItems) return <NotCartItems />;
    else {
      return (
        <>

            <nav
              className="menu"
              style={{
                position: "fixed",
                display: "block",
                width: "100%",
                zIndex: "1",
                top: "0",
                visibility: diVisible1,
              }}
            >
              <div
                className="menu__logo"
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: ".3rem",
                  paddingBottom: ".35rem",
                }}
              >
                <div>
                  <ArrowLeftOutlined
                    style={{
                      marginLeft: "2rem",
                      marginRight: "1rem",
                      color: "grey",
                    }}
                    onClick={hideDiv}
                  />
                </div>
                <div>
                  <Search
                    placeholder="Search.."
                    style={{ marginBottom: ".3rem" }}
                  />
                </div>
              </div>
            </nav>

          <nav
            className="menu"
            style={{
              position: "fixed",
              display: "block",
              width: "100%",
              zIndex: "1",
              top: "0",
              visibility: diVisible,
            }}
          >
            <div className="menu__logo" style={{ marginTop: "0.5rem" }}>
              <b>
                <Link to="/" style={{ color: "#484848" }}>
                  Kitenge
                </Link>
              </b>
            </div>
            <Menu
              mode="horizontal"
              style={{
                justifyContent: "space-between",
                border: "0",
                float: "right",
              }}
            >
              <Menu.Item style={{ marginLeft: ".3rem", marginRight: ".3rem" }}>
                  <SearchOutlined
                    onClick={showDiv}
                    style={{ fontSize: "1.4rem", margin: "0", color: "grey" }}
                  />
              </Menu.Item>

              <Menu.Item style={{ marginLeft: ".3rem", marginRight: ".3rem" }}>
                <Badge count={cartItems.length}>
                  <ShoppingCartOutlined
                    onClick={showModal}
                    style={{ fontSize: "1.4rem", margin: "0", color: "grey" }}
                  />
                </Badge>
              </Menu.Item>

              <SubMenu
                style={{
                  marginBottom: "0rem",
                  borderRadius: "10px",
                  marginLeft: ".3rem",
                  marginRight: ".3rem",
                }}
                title={
                  <SettingOutlined
                    style={{ fontSize: "1.2rem", color: "grey" }}
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
                style={{
                  marginBottom: "0.3rem",
                  borderRadius: "10px",
                  marginLeft: "0",
                }}
                title={
                  <Avatar
                    src={userInfo.avatar}
                    style={{ width: "1.4rem", height: "auto", margin: "0px" }}
                  />
                }
              >
                <Menu.Item style={{ margin: "0" }}>{userInfo.email}</Menu.Item>
                <Menu.Item
                  style={{
                    margin: "0",
                  }}
                >
                  <Link to="/register">Manage account</Link>
                </Menu.Item>
                <Menu.Item
                  style={{
                    margin: "0",
                  }}
                >
                  Logout
                </Menu.Item>
              </SubMenu>
            </Menu>
            {/* navbar */}
          </nav>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Table dataSource={cartItems} columns={columns} />

            <Row align="middle" justifyContent="space-between">
              <Col>
                <a href="/cart">Proceed to checkout</a>
              </Col>
            </Row>
          </Modal>
        </>
      );
    }
  }
}
