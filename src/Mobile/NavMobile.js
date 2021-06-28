import React, { useCallback, useContext, useState } from "react";
import { Col, Image, Row, Modal, Table } from "antd";
// import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn";
import NotCartItems from "./NotCartItems";
import { Link } from "react-router-dom";
import {
  
  SearchIcon,
  
  XIcon,
} from "@heroicons/react/solid";
import {QuestionMarkCircleIcon,ShoppingCartIcon,InboxInIcon} from '@heroicons/react/outline'
import {Navbar} from '../components/styles'
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { UserContext } from "../users/UserContext";
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

export default function NavMobile() {
  const userInfo = useContext(UserContext)
  const CartItems = useSelector((state) => state.cart);
  const { cartItems } = CartItems;

  const [visible, setVisible] = useState(false);
  const [diVisible, setDiVisible] = useState("hidden");

  function handleOk() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  const showDiv = useCallback(() => {
    setDiVisible("visible");
  }, [setDiVisible]);

  const hideDiv = useCallback(() => {
    setDiVisible("hidden");
  }, [setDiVisible]);

  if (!userInfo) return <NotSignedIn />;
  else {
    if (!cartItems) return <NotCartItems />;
    else {
      return (
        <>
          <Navbar className="shadow-md "
            style={{ visibility: diVisible }}

          >
              <div className="active:bg-black active:bg-opacity-20 active:rounded-full p-2">
                <ChevronLeftIcon
                className="h-5 text-gray-500 "
                onClick={hideDiv}
              />     
              </div>

            <div className="bg-gray-200 rounded-full  flex items-center justify-end flex-1">
              <SearchIcon className="h-5 text-gray-400 m-2 cursor-pointer focus:text-gray-500" />
              <input
                placeholder="Search.."
                className=" focus:outline-none w-full rounded-full bg-transparent"
              />
              <XIcon className="h-5 text-gray-400 m-2 cursor-pointer focus:text-gray-500" />
            </div>
          </Navbar>

          <nav
            className="flex justify-between p-2 bg-white items-center shadow-md  w-full fixed top-0 z-50"

          >
            <div className="">
              <Link to="/" className="font-bold text-lg text-gray-700">
                Dozens
              </Link>
            </div>
            <div className="flex flex-row space-x-2 p-2">

              <SearchIcon
                onClick={showDiv}
                className="h-5 w-5 text-gray-500 font-bold -mb-2 rounded-full "
              />

              <ShoppingCartIcon className="h-5 text-gray-400" />
              <InboxInIcon className="h-5 text-gray-400" />
              <QuestionMarkCircleIcon className="h-5 text-gray-500" />
              <div className="bg-gray-500 rounded-full">
                <img src={userInfo.avatar} style={{width:"21px", height:"21px",borderRadius:"50px"}} />
              </div>
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

