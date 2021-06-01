import React, { useCallback, useState } from "react";
import { Col, Image, Row, Modal, Table } from "antd";
// import { Link } from "react-router-dom";
import NotSignedIn from "./NotSignedIn";
import NotCartItems from "./NotCartItems";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  ArrowLeftIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/solid";

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
  const [transition, setTransition] = useState(false);

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

  const showDiv = useCallback(() => {
    setDiVisible("hidden");
    setDiVisible2("visible");
    setTransition(true);
  }, [setDiVisible, setDiVisible2, setTransition]);

  const hideDiv = useCallback(() => {
    setDiVisible("visible");
    setDiVisible2("hidden");
    setTransition(false);
  }, [setDiVisible2, setDiVisible, setTransition]);

  if (!userInfo) return <NotSignedIn />;
  else {
    if (!cartItems) return <NotCartItems />;
    else {
      return (
        <>
          <CSSTransition
            in={transition}
            timeout={500}
            classNames="display"
            unmountOnExit
          >
            <nav
              className="flex justify-around bg-white p-1 content-center items-center shadow-md fixed  top-0 z-10 w-full"
              style={{}}
            >
              <div className="focus:bg-gray-300 opacity-1 p-1 rounded-full">
                <ArrowLeftIcon className="h-5 active:bg-gray-300 text-gray-500" onClick={hideDiv} />
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
          </CSSTransition>

          <nav
            className="flex justify-between p-2 bg-white items-center shadow-md  top-0 fixed z-10 w-full"
            style={{ visibility: diVisible }}
          >
            <div className="">
              <Link to="/" className="font-bold text-lg text-gray-700">
                Kitenge
              </Link>
            </div>
            <div className="flex flex-row space-x-2">
            <SearchIcon
                onClick={showDiv}
                className="h-5 w-5 text-gray-500 font-bold -mb-2 rounded-full "
              />
              <div className="bg-gray-500 rounded-full">
                <UserIcon className="h-5 text-gray-400" />
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
