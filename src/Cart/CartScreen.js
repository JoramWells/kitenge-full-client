import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../_actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Empty, Image, Table } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";

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
      return <></>;
    }
    return () => {};
  }, []);
  return (
    <main style={{ padding: "1rem" }}>
      {cartItems.length === 0 ? (
        <Row
          justify="space-around"
          align="middle"
          style={{ marginTop: "5rem", marginBottom: "5rem" }}
        >
          <Col>
            <Empty description="Cart is empty"></Empty>
          </Col>
        </Row>
      ) : (
        <Row justify="space-around" align="middle">
          <Col>
            <Table dataSource={cartItems} columns={columns} />
          </Col>
        </Row>
      )}
      <Row justify="space-around" align="middle">
        <Col>
          <h3>
            Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ksh{" "}
            <NumberFormat
              value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              thousandSeparator={true}
              displayType={"text"}
            />
          </h3>
        </Col>
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginBottom: ".5rem" }}
      >
        <Col>
          <Button size="large" icon={<ArrowLeftOutlined />} block type="primary" style={{ borderRadius: "5px"}}>
            Continue
          </Button>
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col>
          <Button
          size="large"
          icon={<ArrowRightOutlined/>}
            className="cart"
            type="primary"
            block
            style={{ border: "0", borderRadius: "5px" }}
            disabled={cartItems.length === 0}
          >{" "}
              <Link to="/shipping" style={{ color: "black" }}>
                Checkout
              </Link>
          </Button>
        </Col>
      </Row>
    </main>
  );
}
