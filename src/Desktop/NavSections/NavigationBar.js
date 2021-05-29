import React, { useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button, Input, Row, Col, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";

const { Search } = Input;

function NavigationBar(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  async function onSearch() {
    dispatch(searchItems({ keyword: "amazing", min_videos: "1" }));
    message.info("Waaaaaaat!!!");
    // await axios.post('/andeyo',{keyword:"amazing",min_videos:1}).then(response=>{
    //   setPosts(response.data)
    //   console.log(posts)
    // }).catch(err=>console.log(err))
    setTimeout(() => {
      props.history.push("/searched");
    }, 1000);
  }

  return (
    <div
      style={{
        zIndex: 1,
        width: "100%",
        position: "static",
        top: "0px",
        // marginBottom: "5rem",
      }}
      className="desktop__navbar"
    >
      <nav className="menu">
        <div className="menu__logo">
          <Link to="/" style={{ padding: "1rem", color: "#484848" }}>
            <b>OnlineShop</b>
          </Link>
          {/* <Row justify="center">
          <Col span={6}>
            <Search placeholder="Search.." onSearch={onSearch} />
          </Col>
        </Row> */}
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

export default withRouter(NavigationBar);
