import React from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'

export default function NotSignedIn() {
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
        <div className="menu__logo" style={{ marginTop: "0.4rem" }}>
          <Link to="/" >
            {navigator.onLine?<span style={{ color: "green" }}><b>Kitenge</b> </span>:<span style={{ color: "#484848" }}> <b>JandJ</b></span>}
              
            
          </Link>
        </div>

        <Menu mode="horizontal" style={{ float: "right", border: "0" }}>
          <Menu.Item
            icon={<LoginOutlined style={{ fontSize: "1rem", margin: "0px" }} />}
          >
            <Link to="/login">{"  "}Login</Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <UserAddOutlined style={{ fontSize: "1rem", margin: "0px" }} />
            }
          >
            <Link to="/register">{"  "}Register</Link>
          </Menu.Item>
        </Menu>
      </nav>
    )
}
