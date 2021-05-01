import React, { lazy, useCallback, useState } from "react";
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
  Result,
  Input,
} from "antd";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Ripples from "react-ripples";
import mpesa from "../img/mpesa.png";

// import { listProducts } from "../../_actions/productActions";
import {
  ClockCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  ReloadOutlined,
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
      <Card loading style={{ width: "18rem", height: "17rem" }}></Card>
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
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  

  function showModal2() {
    setTimeout(() => {
      setVisible2(true);
    }, 500);
  }

  function showModal3() {
    setTimeout(() => {
      setVisible3(true);
    }, 500);
  }

  const  showModal = useCallback((item) => {
    setTimeout(() => {
      setVisible(true);
    }, 500);

    setId(item.id);
    setImage(item.image);
    setDate(item.updatedAt);
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
    setRate(item.ratings);
  })

  function handleCancel() {
    setTimeout(() => {
      setVisible(false);
      setVisible2(false);
    }, 1000);
  }
  function  handleCancel2() {
    setTimeout(() => {
      setVisible2(false);
    }, 500);
  };
  function  handleCancel3 () {
    setTimeout(() => {
      setVisible3(false);
    }, 500);
  };
  function  handleReload () {
    window.location.reload();
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
            height: "400px",

            margin: "auto",
            transition: "2s",
            transitionTimingFunction: "ease-in",
          },
        }}
      >
        <Row justify="end">
          <Col>
            <Ripples>
              <CloseCircleOutlined
                className="close"
                style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
                onClick={handleCancel}
              />
            </Ripples>
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
        <Link to={`/product-detail/${id}/?category=${category}`}>
          <h3 style={{ color: "rgba(211, 84, 0, 1)" }}> {name}</h3>
        </Link>

        <Row>
          <Rate
            name="size-small"
            allowHalf={true}
            style={{
              fontSize: "1rem",
              color: "#282c35",
            }}
            defaultValue={rate}
          />
        </Row>
        <div
          style={{
            width: "7rem",
            paddingTop: ".2rem",
            paddingBottom: ".2rem",
            marginTop: ".5rem",
            display: "block",
            paddingLeft: ".5rem",
            borderRadius: "5px",
            backgroundColor: "rgba(211, 84, 0, 0.1)",
          }}
        >
          <NumberFormat
            value={price}
            thousandSeparator={true}
            displayType={"text"}
            prefix="Kshs: "
            suffix=" /="
          />
        </div>
        <p style={{ marginTop: ".4rem" }}>
          {" "}
          Delivery in 24
          <ClockCircleOutlined style={{ color: "green" }} />{" "}
        </p>

        <Divider />

        <address style={{ color: "grey", textAlign: "center" }}>
          {description}
        </address>

        <Row justify="space-around" align="middle">
          <Col>
            <Button
              onClick={showModal2}
              icon={<ShoppingOutlined style={{ fontSize: "1.3rem" }} />}
              style={{
                border: "0",
                backgroundColor: "rgba(211, 84, 0, 0.8)",
                color: "white",
                borderRadius: "5px",
              }}
            >
              {" "}
              <b>Purchase</b>
            </Button>
          </Col>
        </Row>
      </Modal>

      {/* _________________________________Payment Modal2_______________________________ */}
      <Modal
        isOpen={visible2}
        onRequestClose={handleCancel}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            transitionDuration: "3s",
          },
          content: {
            marginTop: "3rem",
            height: "300px",

            margin: "auto",
            transition: "2s",
            transitionTimingFunction: "ease-in",
          },
        }}
      >
        <Row justify="end">
          <Col>
            <Ripples>
              <CloseCircleOutlined
                className="close"
                style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
                onClick={handleCancel2}
              />
            </Ripples>
          </Col>
        </Row>
        <Row>
          <img src={mpesa} style={{ width: "100px" }} alt="mpesa_logo" />
          <Form>
            <Form.Item required label="Phone Number">
              <Input placeholder="+254 799 980 846" />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={showModal3}
                block
                type="primary"
                style={{ borderRadius: "5px" }}
              >
                BUY
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Modal>

      {/* ______________________________________________Payment Modal_________________________________________ */}
      <Modal
        isOpen={visible3}
        onRequestClose={handleCancel3}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            transitionDuration: "3s",
          },
          content: {
            marginTop: "3rem",
            height: "300px",

            margin: "auto",
            transition: "2s",
            transitionTimingFunction: "ease-in",
          },
        }}
      >
        <Row>
          <Result
            status="success"
            title="Successfully"
            subTitle={"Purchased " + name}
          />
        </Row>
      </Modal>
      <CarouselHeader />

      {loading ? (
        <Row justify="space-around" align="middle" gutter={[0, 16]}>
          {renderSkeleton}
        </Row>
      ) : error ? (
        <Result
          status="500"
          subTitle={error}
          extra={
            <Button onClick={handleReload} icon={<ReloadOutlined />}>
              RETRY
            </Button>
          }
        />
      ) : (
        <>
          <Row justify="space-around" align="middle" gutter={[0, 16]} style={{backgroundColor:"black"}}>
            {posts.map((item) => (
              <Col key={item.id}>
                <Card
                  style={{
                    width: "17rem",
                    height: "auto",
                    padding:"0rem"
                  }}
                  extra={
                    <Ripples>
                      <EllipsisOutlined
                        onClick={() => showModal(item)}
                        key="ellipsis"
                        style={{
                          fontSize: "1.3rem",
                        }}
                      />
                    </Ripples>
                  }
                  cover={
                    <LazyLoadImage
                      src={item.image}
                      effect="blur"
                      alt="product-Image"
                      style={{
                        marginTop:"0",
                        width: "17rem",
                        height: "15.86rem",
                        display: "flex",
                        margin: "auto",
                        objectFit:"contain"
                      }}
                    />
                  }
                >
                  <Meta
                  style={{padding:"0"}}
                    title={
                      <Link
                        to={`/product-detail/${item.id}/?category=${item.category}`}
                      >
                        <h3
                          style={{ color: "rgba(211, 84, 0, 1)", margin: "0" }}
                        >
                          {" "}
                          {item.product_name}
                        </h3>
                      </Link>
                    }
                    description={
                      <Rate
                        name="size-small"
                        allowHalf={true}
                        style={{
                          fontSize: "1rem",
                          color: "#282c35",
                          marginBottom: ".6rem",
                        }}
                        defaultValue={item.ratings}
                      />
                    }
                  />

                  <p
                    style={{
                      color: "grey",
                      fontSize: "1rem",
                      marginBottom: ".3rem",
                    }}
                  >
                    <NumberFormat
                      value={item.price}
                      thousandSeparator={true}
                      displayType={"text"}
                      prefix="Kshs: "
                      suffix=" /="
                    />
                  </p>
                  {/* <div
                    style={{
                      backgroundColor: "rgba(240, 52, 52, 0.3)",
                      borderRadius: "5px",
                      width: "2.4rem",
                      textAlign: "center",
                    }}
                  >
                    <NumberFormat
                      value={25}
                      displayType="text"
                      prefix="-"
                      suffix="%"
                    />
                  </div> */}
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
