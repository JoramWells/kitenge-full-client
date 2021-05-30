import React, { useState } from "react";
import {  SearchOutlined } from "@ant-design/icons";
import { Col, Image, Row, Modal, Table, Input } from "antd";
import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn";
import NotCartItems from "./NotCartItems";
import { useSelector } from "react-redux";
import NotCartItemsDropdown from "./NotCartItemsDropdown";
import { ArrowLeftIcon, SearchCircleIcon, SearchIcon, XIcon } from "@heroicons/react/solid";

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

const { Search } = Input;
export default function NavMobile(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const CartItems = useSelector((state) => state.cart);
  const { cartItems } = CartItems;

  const [visible, setVisible] = useState(false);
  const [diVisible, setDiVisible] = useState("visible");
  const [diVisible1, setDiVisible2] = useState("hidden");
  const { isToggleData, setToggle } = useState(false);

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
            className="flex justify-around bg-white p-2 content-center items-center shadow-md  top-0 absolute w-full"
            style={{
              visibility: diVisible1,
            }}
          >
            <div className="bg-gray-300 opacity-1 p-1 rounded-full">
              <ArrowLeftIcon
              className="h-5 text-white"
                onClick={hideDiv}
              />
            </div>
            <div className="bg-yellow-200 rounded-full  flex items-center justify-end -ml-4" >
              <SearchIcon className="h-5 text-gray-500 m-2"/>
              <input placeholder="Search.." className=" focus:outline-none rounded-full bg-yellow-200" />
            <XIcon className="h-5 text-gray-500 m-2"/>

            </div>
          </nav>

          <nav
            className="flex justify-around bg-white p-2 content-center items-center shadow-md  top-0 absolute w-full"
            style={{ visibility: diVisible }}
          >
            {/* <div>
              <Link to="/" className="font-medium text-lg text-gray-700">
                Kitenge
              </Link>
            </div> */}
            <div>
              <SearchOutlined
                onClick={showDiv}
                // className="h-5 w-5 text-gray-500 "
              />
            </div>
            <div>
              <NotCartItemsDropdown />
            </div>

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
