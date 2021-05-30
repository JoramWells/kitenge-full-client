import React, { useState } from "react";
import { Col, Image, Row, Modal, Table } from "antd";
import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn";
import NotCartItems from "./NotCartItems";
import { useSelector } from "react-redux";
import NotCartItemsDropdown from "./NotCartItemsDropdown";
import { ArrowLeftIcon, SearchIcon, XIcon } from "@heroicons/react/solid";

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
            className="flex justify-around bg-white p-2 content-center items-center shadow-md fixed  top-0 z-10 w-full"
            style={{
              visibility: diVisible1,
            }}
          >
            <div className="bg-gray-300 opacity-1 p-1 rounded-full">
              <ArrowLeftIcon className="h-5 text-white" onClick={hideDiv} />
            </div>
            <div className="bg-yellow-100 rounded-full  flex items-center justify-end -ml-8">
              <SearchIcon className="h-5 text-gray-400 m-2 cursor-pointer focus:text-gray-500" />
              <input
                placeholder="Search.."
                className=" focus:outline-none rounded-full bg-yellow-100"
              />
              <XIcon className="h-5 text-gray-400 m-2 cursor-pointer focus:text-gray-500" />
            </div>
          </nav>

          <nav
            className="flex justify-around bg-white p-2 items-center shadow-md  top-0 fixed z-10 w-full"
            style={{ visibility: diVisible }}
          >
            {/* <div className="ml-4 mr-4">
              <Link to="/" className="font-medium text-lg text-gray-700">
                Kitenge
              </Link>
            </div> */}
            <div>
              <SearchIcon
                onClick={showDiv}
                className="h-5 w-5 text-gray-500 -mb-2 "
              />
            </div>
            <div className="mr-4">
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
