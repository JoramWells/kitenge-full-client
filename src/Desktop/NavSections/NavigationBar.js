import React, { useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import {  MenuOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom'

function NavigationBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        zIndex: 1,
        width: "100%",
        position: "static",
        top: "0px",
        display: "block",
      }}
      className="desktop__navbar"
    >
      <nav className="menu">
        <div className="menu__logo">
        <Link to="/" style={{ padding: "1rem",color:"#484848" }} >
                <b>OnlineShop</b>
              </Link>
        </div>
        <div className="menu__container">
          {/* <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div> */}

          <div className="menu_rigth">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            size="large"
            type="secondary"
            className="menu__mobile-button"
            onClick={showDrawer}
          >
            <MenuOutlined style={{ fontSize: "1.5rem" }} />
          </Button>
          <Drawer
            title="My Menu"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
