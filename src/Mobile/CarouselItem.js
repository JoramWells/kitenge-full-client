import React, { lazy, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Rate,
  Form,
  Skeleton,
  message,
  Button,
  Image,
  Divider,
} from "antd";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
// import { listProducts } from "../../_actions/productActions";
import {
  CloseCircleOutlined,
  EllipsisOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { addToCart } from "../_actions/cartActions";
import CarouselHeader from "../Generic/CarouselHeader";
import Modal from "react-modal";

Modal.setAppElement("#root");
const { Meta } = Card;

const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
      <Form layout="vertical">
        <Form.Item>
          <Skeleton.Input style={{ width: "18rem", height: "150px" }} /> <br />
        </Form.Item>

        <Form.Item>
          <Skeleton.Input
            style={{ width: "200px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
        <Form.Item>
          <Skeleton.Input
            style={{ width: "250px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
      </Form>
    </Col>
  );
});

function CarouselItem(props) {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("");

  const [description, setDescription] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);

  const showModal = (item) => {
    setVisible(true);
    setId(item.id);
    setImage(item.image);
    setDate(item.updatedAt);
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
    setRate(item.rate);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const productAddToCart = (productId, product_name) => {
    if (!userInfo) {
      message.warn("Redirecting to login page...");
      props.history.push("/login");
    } else {
      setTimeout(async () => {
        await dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone));
      }, 2000);

      message.success(`${product_name} added to cart`);
    }
  };

  return (
    <main style={{ backgroundColor: "#F8F8F8", marginTop: "5rem" }}>
      <Modal
        isOpen={visible}
        onRequestClose={handleCancel}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            transitionDuration: "3s",
          },
          content: {
            marginTop: "3rem",
            height: "450px",

            margin: "auto",
            transition: "2s",
            transitionTimingFunction: "ease-in",
          },
        }}
      >
        <Row justify="end">
          <Col>
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
              onClick={handleCancel}
            />
          </Col>
        </Row>
        <Row justify="space-around" align="middle">
          <Col>
            <Image
              src={image}
              style={{ width: "100px", borderRadius: "5px" }}
            />
          </Col>
        </Row>
        <div>
          <Link to={`/product-detail/${id}/?category=${category}`}>
            <h3 style={{ color: "rgba(89, 171, 227, 1)" }}> {name}</h3>
          </Link>
          <NumberFormat
            value={price}
            thousandSeparator={true}
            displayType={"text"}
            prefix="Kshs: "
            suffix=" /="
          />

          <Row>
            <Rate
              name="size-small"
              allowHalf={true}
              style={{
                fontSize: "1rem",
                color: "rgba(249, 180, 45,1)",
              }}
              defaultValue={rate}
            />
          </Row>

          <Divider />

          <address style={{ color: "grey", textAlign: "center" }}>
            {description}
          </address>
        </div>

        <Row justify="space-around" align="middle">
          <Col>
            <Button
              icon={<ShoppingOutlined style={{ fontSize: "1rem" }} />}
              style={{
                border: "0",
                backgroundColor: "rgba(252, 214, 112, 1)",
                color: "white",
              }}
            >
              {" "}
              <b>Purchase</b>{" "}
            </Button>
          </Col>
        </Row>
      </Modal>
      <CarouselHeader />

      {loading ? (
        <Row justify="space-around" align="middle" gutter={[0, 16]}>
          {renderSkeleton}
        </Row>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Row justify="space-around" align="middle" gutter={[0, 16]}>
            {posts.map((item) => (
              <Col key={item.id}>
                <Card
                  style={{
                    width: "17rem",
                    height: "auto",
                  }}
                  extra={
                    <EllipsisOutlined
                      onClick={() => showModal(item)}
                      key="ellipsis"
                      style={{
                        fontSize: "1.3rem",
                      }}
                    />
                  }
                  cover={
                    <LazyLoadImage
                      src={item.image}
                      effect="blur"
                      alt="product-Image"
                      style={{
                        maxHeight: "16.86rem",
                        maxWidth: "17rem",
                        width: "17rem",
                        height: "auto",
                        display: "flex",
                        margin: "auto",
                      }}
                    />
                  }
                >
                  <Meta
                    title={
                      <Link
                        style={{ color: "rgba(89, 171, 227, 1)" }}
                        to={`/product-detail/${item.id}/?category=${item.category}`}
                      >
                        {item.product_name}
                      </Link>
                    }
                    description={
                      <Rate
                        name="size-small"
                        allowHalf={true}
                        style={{
                          fontSize: "1rem",
                          color: "rgba(252, 214, 112, 1)",
                          marginBottom: ".6rem",
                        }}
                        defaultValue={item.ratings}
                      />
                    }
                  />
                  <Row>
                    <Col style={{ color: "rgba(129, 207, 224, 1)" }}>
                      <span style={{ color: "grey" }}> Updated :</span>{" "}
                      {moment(item.updatedAt, "hh").fromNow()}
                    </Col>
                  </Row>
                  <b style={{ color: "grey" }}>
                    <NumberFormat
                      value={item.price}
                      thousandSeparator={true}
                      displayType={"text"}
                      prefix="Kshs: "
                      suffix=" /="
                    />
                  </b>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </main>
  );
}

export default withRouter(CarouselItem);
