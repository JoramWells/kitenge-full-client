import React from "react";
import {
  Menu,
  
  Input
} from "antd";
import { withRouter } from "react-router-dom";

const {Search} = Input

function LeftMenu() {
    return(
        <Menu mode="horizontal" style={{ paddingTop: "0.4rem" }}>
        <Menu.Item key="mail">
            <Search title="search" />

        </Menu.Item>

      </Menu>

    )


 
}

export default withRouter(LeftMenu);
