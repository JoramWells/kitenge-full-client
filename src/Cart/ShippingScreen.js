import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../_actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Row,
  Col,
  Empty,
  Image,
  Typography,
  Table,

} from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";

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
      <Image src={img} alt="image file" style={{ width: "50px" }} />
    ),
  },
  {
    title: "qty",
    dataIndex: "qty",
    key: "qty",
  },

  {
    title: "Address",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
];

const { Title, Text } = Typography;
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
      console.log()
    }
    return () => {};
  }, []);
  return (
    <div style={{ padding: "1rem" }}>

      {cartItems.length === 0 ? (
        <Row justify="space-around" align="middle" style={{ padding: "2rem" }}>
          <Col>
            <Empty description="Cart is empty"></Empty>
          </Col>
        </Row>
      ) : (
        <Table dataSource={cartItems} columns={columns}></Table>
      )}
      <div>
        <Row justify="space-around" align="middle">
          <Col>
            <Title level={5}>
              {" "}
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ksh{" "}
              <NumberFormat
                value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                thousandSeparator={true}
                displayType={"text"}
              />
            </Title>
          </Col>
        </Row>
        <Row justify="space-around" align="middle">
          <Col>
            <Button
              block
              type="primary"
              size="large"
              style={{ borderRadius: "50px" }}
            >
              CONTINUE SHOPPING
            </Button>
          </Col>
          <Col>
            <Button
              className="cart"
              size="large"
              type="primary"
              block
              style={{ border: "0", borderRadius: "50px" }}
            >
              <Text disabled={cartItems.length === 0}>
                <Link to="/shipping" style={{ color: "black" }}>
                  PROCEED TO CHECKOUT
                </Link>
              </Text>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
