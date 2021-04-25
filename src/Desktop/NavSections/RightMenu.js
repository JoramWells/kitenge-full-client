import React, { useState } from "react";
import { Menu, Space, Badge, Modal, Col, Row, Typography, Image,message, Button } from "antd";
import Cookie from "js-cookie";
import {withRouter,Link, useHistory} from "react-router-dom"
import {
  EditOutlined,
  LoginOutlined,
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
const cartItems = Cookie.getJSON("cartItems");


function RightMenu(props) {
  const history = useHistory()
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
//   const PaymentList = useSelector((state) => state.paymentList);
//   const { payments } = PaymentList;

  const showModal = () => {
    setVisible(true);
  };
  const logout = async() =>{
    if(!userInfo){
      console.log()
    }
    await Cookie.remove('userInfo')
    setTimeout((
      message.success('Logged out successfully')
    ),2000)
    history.goBack()
  }

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  if (!userInfo) {
    return (
      <Menu mode="horizontal" style={{paddingTop:"0.4rem"}}>
        <Menu.Item key="mail">
          <Link to="/login">
          <Button icon={<LoginOutlined style={{margin:"0px", fontSize:"1rem"}} />} style={{borderRadius:"50px"}}>Signin</Button>
            
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">
            <Button style={{borderRadius:"50px"}} icon={<UserAddOutlined style={{fontSize:"1rem", margin:"0px"}} />}>Signup</Button>
          </Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    if (!cartItems) {
      return (
        <Space>
          <Menu mode="horizontal">
            <SubMenu title={
              <ShoppingCartOutlined
                  onClick={showModal}

                  style={{ fontSize: "1.3rem", margin:"0"}}

              />
            }>

            </SubMenu>

            <SubMenu
              title={<QuestionCircleOutlined style={{ fontSize: "1.3rem",marginTop:"0" }} />}
            >
              <Menu.Item style={{margin:"0px"}} >Contact supplier</Menu.Item>
              <Menu.Item style={{margin:"0px"}}>How to add product</Menu.Item>
              <Menu.Item>Creating account</Menu.Item>
              <Menu.Item>Tracking your order</Menu.Item>


            </SubMenu>
            <SubMenu
                style={{  borderRadius: "10px", marginLeft:"0" }}
                title={<SettingOutlined style={{ fontSize: "1.3rem" }} />}
              >
            <Menu.Item icon={<PlusOutlined/>}>
              <Link to="/products/add">
              Add Product
              </Link>
               
              </Menu.Item>
              <Menu.Item icon={<EditOutlined />}>
              <Link to="/produc/manage">
              Edit Product
              </Link>
               
              </Menu.Item>
              


              </SubMenu>

            <SubMenu style={{marginLeft:"0"}} title={<Avatar src={userInfo.avatar} style={{width:"25px", height:"auto",marginBottom:"0.5rem", marginLeft:"0"}} />}>

              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item onClick={()=>logout()}>Logout</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
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
                  style={{ fontSize: "1.4rem", margin:"0" }}
                />
              </Badge>
              
            </Menu.Item>
            <Menu.Item>
              <Badge dot count={cartItems.length}>
                <MailOutlined
                  style={{ fontSize: "1.3rem", margin:"0" }}
                />
              </Badge>
              
            </Menu.Item>

            <SubMenu
              title={<QuestionCircleOutlined style={{ fontSize: "1.3rem" }} />}
            >
              <Menu.Item style={{margin:"0px"}} >Contact supplier</Menu.Item>
              <Menu.Item style={{margin:"0px"}}>How to add product</Menu.Item>
              <Menu.Item>Creating account</Menu.Item>
              <Menu.Item>Tracking your order</Menu.Item>


            </SubMenu>
            <SubMenu
                style={{ borderRadius: "10px", marginLeft:"0" }}
                title={<SettingOutlined style={{ fontSize: "1.3rem" }} />}
              >
            <Menu.Item icon={<PlusOutlined/>}>
              <Link to="/products/add">
              Add Product
              </Link>
               
              </Menu.Item>
              <Menu.Item icon={<EditOutlined/>}>
              <Link to="/produc/manage">
              Edit Product
              </Link>
               
              </Menu.Item>


              </SubMenu>
            <SubMenu style={{marginLeft:"0"}} title={<Avatar   src={userInfo.avatar} style={{marginBottom:"0.5rem", width:"25px", height:"inherit"}} />}>

              <Menu.Item>{userInfo.email}</Menu.Item>
              <Menu.Item style={{justifyContent:"space-around", display:"flex", margin:"0"}}>
                <Button style={{borderRadius:"50px"}}>
                  <Link to="/register">Manage account</Link>
                </Button>
              </Menu.Item>
              
              <Menu.Item style={{justifyContent:"space-around", display:"flex", margin:"0"}}>Logout</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {cartItems.map((product) => (
              <Row justify="space-around" align="middle" key={product.id}>
                <Col>
                  <Image
                    src={product.image}
                    alt="profile_pic"
                    style={{ width: "50px" }}
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

export default withRouter (RightMenu);
