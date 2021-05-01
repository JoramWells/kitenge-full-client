import { EditOutlined, PlusOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd'
import {Link} from 'react-router-dom'
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import Ripples from 'react-ripples'
import moment from 'moment'
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;
export default function NotCartItems() {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin
    return (
        <nav
          className="menu"
          style={{
            position: "fixed",
            display: "block",
            width: "100%",
            zIndex: "1",
            top: "0",
          }}
        >
          <div className="menu__logo" style={{ marginTop: "0.5rem" }}>
            <a href="/" style={{ color: "#484848" }}>
              <Ripples>
                <b> Kitenge</b>
              </Ripples>

              
            </a>
          </div>
          <Menu
            mode="horizontal"
            style={{
              float: "right",
              border: "0",
            }}
          >
            <SubMenu
              title={
                <QuestionCircleOutlined style={{ fontSize: "1.3rem", color:"grey" }} />
              }
            >
              <Menu.Item style={{ margin: "0px" }}>Contact supplier</Menu.Item>
              <Menu.Item style={{ margin: "0px" }}>
                How to add product
              </Menu.Item>
              <Menu.Item>Creating account</Menu.Item>
              <Menu.Item>Tracking your order</Menu.Item>
            </SubMenu>
            <SubMenu title={<SettingOutlined style={{ fontSize: "1.3rem", color:"grey" }} />}>
              <Menu.Item icon={<PlusOutlined />}>
                <Link to="/products/add">Add Product</Link>
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />}>
                <Link to="/produc/manage">Edit Product</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              style={{ marginBottom: "0.4rem" }}
              title={
                <Avatar
                  src={
                    userInfo.avatar
                      ? userInfo.avatar
                      : `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                  }
                  style={{ width: "1.5rem", height: "auto", margin: "0px" }}
                />
              }
            >
              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item
                style={{ justifyContent: "space-around", display: "flex" }}
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
        </nav>
    )
}
