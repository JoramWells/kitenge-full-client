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
} from "antd";
import moment from 'moment'
import PhoneInput from "react-phone-input-2";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
// import { listProducts } from "../../_actions/productActions";
import { EllipsisOutlined } from "@ant-design/icons";
import { addToCart } from "../_actions/cartActions";
import CarouselHeader from "../Generic/CarouselHeader";
import Modal from "react-modal";

Modal.setAppElement("#root");
const posts = [1, 2, 3, 4, 5];

const renderSkeleton = posts.map((post) => {
  return (
    <Col key={post}>
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

  const [description, setDescription] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = (item) => {
    setVisible(true);
    setId(item.id);
    setImage(item.image);
    setDate(item.updatedAt)
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
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
            backgroundColor: "",
          },
          content: {
            marginTop: "3rem",
            height: "355px",
          },
        }}
      >
        <Row justify="space-around" align="middle">
          <Col>
            <Image
              src={image}
              style={{ width: "100px", borderRadius: "5px" }}
            />
          </Col>
        </Row>
        <div>
          <h3>{name}</h3>
          <NumberFormat
                value={price}
                thousandSeparator={true}
                displayType={"text"}
                prefix="Kshs: "
                suffix=" /="
              />
          <h5>{description}</h5>
        </div>

        Purchases: (74)
        <br/>
        {moment(date,"hh").fromNow()}
        <Row justify="space-around" align="middle">
          <Col><Button style={{border:"0"}}>Purchase</Button></Col>
        </Row>
      </Modal>
      <CarouselHeader />

      {loading ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Row
            justify="space-around"
            align="middle"
            gutter={[0, 16]}
            style={{
              backgroundColor: "#282c35",
            }}
          >
            {posts.map((item) => (
              <Col key={item.id}>
                <Card
                  style={{
                    width: "17rem",
                    height: "auto",
                  }}
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
                  <Link
                    to={`/product-detail/${item.id}/?category=${item.category}`}
                  >
                    <h2 style={{ color: "#0080ff" }}>{item.product_name}</h2>
                  </Link>
                  <Rate
                    name="size-small"
                    style={{ fontSize: "1rem", color: "#f9812a" }}
                    defaultValue={item.ratings}
                  />
                  <br />
                  <h3 style={{ color: "grey" }}>
                    <b>ksh {item.price}</b>
                  </h3>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Button
                        style={{ borderRadius: "7px" }}
                        onClick={() => showModal(item)}
                      >
                        BUY
                      </Button>
                    </Col>
                    <Col>
                      <EllipsisOutlined
                        onClick={showModal}
                        key="ellipsis"
                        style={{
                          transform: "rotate(90deg)",
                          fontSize: "1.5rem",
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
                {/* <Modal
                                title="Product details"
                                visible={visible}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                              >
                                <Row justify="space-around" align="middle">
                                </Row>
                                <Row justify="space-around" align="middle">
                                <Button icon={<ShoppingCartOutlined />}  style={{marginTop:"0.5rem"}}>Add to cart</Button>
              
                                </Row>
                                
                              </Modal> */}
              </Col>
            ))}
          </Row>
        </>
      )}
    </main>
  );
}

export default withRouter(CarouselItem);
