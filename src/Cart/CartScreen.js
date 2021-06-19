import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../_actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Empty, Image, Table } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

const columns = [
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image src={"/" + img} alt="image file" style={{ width: "50px" }} />
    ),
  },
  {
    title: "qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
];

export default function CartScreen(props) {
  const history = useHistory();
  const productId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const back = () => {
    history.goBack();
  };
  const forward = () => {
    history.goForward();
  };

  useEffect(() => {
    if (productId && userInfo) {
      dispatch(addToCart(productId, qty, userInfo.name, userInfo.phone));
    } else {
      return null;
    }
    return () => {};
  }, []);
  return (
    <div
      style={{
        paddingTop: "5rem",
        backgroundColor: "white",
      }}
    >
      {cartItems.length === 0 ? (
        <div
          className="flex flex-row justify-center items-center content-center"
          style={{ marginTop: "5rem", marginBottom: "5rem" }}
        >
          <Empty description="Cart is empty"></Empty>
        </div>
      ) : (
        <div className="flex flex-row justify-center content-center items-center">
          <Table dataSource={cartItems} columns={columns} />
        </div>
      )}
      <div className="flex flex-row justify-center items-center content-center m-4">
        <div className="text-gray-700 text-sm">
          Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items):
          <NumberFormat
            value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            thousandSeparator={true}
            displayType={"text"}
            prefix={" Ksh "}
            suffix={"/="}
            className="font-semibold text-red-400"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center content-center items-center space-x-4">
        <div
          className="flex flex-row content-center items-center justify-center rounded-md"
          style={{ backgroundColor: "#47817F" }}
        >
          <ArrowNarrowLeftIcon className="h-5 m-1" />
          <button className="p-2 focus:outline-none rounded-md">Continue</button>
        </div>
        <div className="bg-black bg-opacity-20 flex flex-row justify-center items-center content-center rounded-md">
          <button
            className=" p-2 focus:outline-none"
            disabled={cartItems.length === 0}
          >
            <Link to="/shipping" className="text-gray-900">
              Checkout
            </Link>
          </button>
          <ArrowNarrowRightIcon className="h-5 m-1 text-gray-500" />

        </div>
      </div>
    </div>
  );
}
