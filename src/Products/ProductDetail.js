import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
// import startsWith from "lodash.startswith";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Divider,
  Rate,
  Image,
  Skeleton,
  Form,
  Empty,
  Modal,
  Input,
  message,
  Result,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import { categoryProduct, detailsProduct } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import RecentItemsBar from "../RecentItemsBar";
import { signin } from "../_actions/userActions";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

const { Meta } = Card;
const Cookie = require("js-cookie");

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};



const { Title, Text } = Typography;

export default function ProductDetail(props) {
  const history = useHistory();

  const productDetail = useSelector((state) => state.productDetail);
  const categoryDetail = useSelector((state) => state.categoryList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [qty, setQty] = useState(1);
  const { product, loading, error } = productDetail;
  const { loadingCategory, products, errorCategory } = categoryDetail;
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const category = params.getAll("category");

  const renderSkeleton = [...Array(4).keys()].map((i) => {
    return (
      <Col key={i}>
        <Form layout="vertical">
          <Form.Item>
            <Skeleton.Input style={{ width: "16rem", height: "150px" }} /> <br />
          </Form.Item>
  
          <Form.Item>
            <Skeleton.Input
              style={{ width: "150px", height: "1rem" }}
              active={true}
            />
          </Form.Item>
          <Form.Item>
            <Skeleton.Input
              style={{ width: "200px", height: "1rem" }}
              active={true}
            />
          </Form.Item>
        </Form>
      </Col>
    );
  });



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    dispatch(categoryProduct(category));
    return () => {};
  }, []);

  const forward = () => {
    history.goForward();
  };
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModal2 = () => {
    // setIsModalVisible2(true);
    props.history.push("/register");
  };

  const handleOk = () => {
    setIsModalVisible2(false);
    setTimeout(
      window.location.reload(),

      2000
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <>
      {/* ___________________________________________Login Modal______________________________________________ */}
      <Modal visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
        Signin
        <Row
          justify="space-around"
          align="middle"
          style={{ marginTop: "1.5rem" }}
        >
          <Col>
            <Card style={{ width: "25rem" }}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Email is invalid")
                    .required("Email is required"),
                  password: Yup.string()
                    .min(6, "Password must be atleast 6 characters")
                    .required("Password is required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    let dataToSubmit = {
                      email: values.email,
                      password: values.password,
                    };
                    await dispatch(signin(dataToSubmit));
                    const userFailure = Cookie.getJSON("userFailure");

                    if (!userFailure) {
                      console.log();
                    } else {
                      setFormErrorMessage(userFailure.message);
                    }

                    const userSuccess = Cookie.getJSON("userInfo");
                    if (!userSuccess) console.log();
                    else {
                      message.success("Successfully login");
                      history.goBack();
                    }

                    setSubmitting(false);
                  }, 500);
                }}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props;
                  return (
                    <Form
                      onSubmit={handleSubmit}
                      layout="vertical"
                      size="large"
                    >
                      <Form.Item required>
                        <Input
                          prefix={<MailOutlined />}
                          id="email"
                          placeholder="Enter email addrress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className={
                            errors.email && touched.email
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </Form.Item>

                      <Form.Item required>
                        <Input.Password
                          id="password"
                          prefix={<LockOutlined />}
                          placeholder="Enter password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className={
                            errors.password && touched.password
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-password">
                            {errors.password}
                          </div>
                        )}
                      </Form.Item>
                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: "#ff0000bf",
                              fontSize: "0.7rem",
                              border: "1px solid",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            {formErrorMessage}{" "}
                          </p>{" "}
                        </label>
                      )}

                      <Form.Item>
                        <Row>
                          <Col>
                            <Button type="link" onClick={showModal2}>
                              {" "}
                              {"Don't have an account? Sign Up"}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          className="cart"
                          htmlType="submit"
                          type="primary"
                          onClick={handleSubmit}
                          loading={isSubmitting}
                          // disabled={!phone}
                          block
                          style={{ border: "none" }}
                        >
                          LOGIN!
                        </Button>
                      </Form.Item>
                    </Form>
                  );
                }}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Modal>

      <main style={{ padding: "20px" }}>
        {loading ? (
          <Row
            justify="space-around"
            align="middle"
            style={{ padding: "2rem" }}
          >
            <Col>
              <Skeleton.Image style={{ width: "300px", height: "300px" }} />
            </Col>
            <Col>
              <Form>
                <Form.Item>
                  <Skeleton.Input style={{ width: "200px" }} />
                </Form.Item>
                <Form.Item>
                  <Skeleton.Input style={{ width: "150px" }} />
                </Form.Item>
                <Form.Item>
                  <Skeleton.Input style={{ width: "250px" }} />
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "300px", height: "300px" }} />
            </Col>
          </Row>
        ) : error ? (
          
          <Result
          status="500"
          subTitle={error}
          />
        ) : (
          <Row
            style={{ padding: "10px" }}
            justify="space-around"
            align="middle"
          >
            <Col xs={24} md={8}>
              <Image
                src={"/"+product.image}
                alt="shoes again"
                style={{ width: "300px", height: "auto" }}
              />
            </Col>

            <Col xs={24} md={8} style={{ padding: "20px" }}>
              <h2 level={3}>{product.product_name}</h2>
              <h3>Reviews: </h3> <Rate de disabled allowHalf defaultValue={product.ratings} />

                <Divider plain></Divider>
                <b style={{  color: "#CD5C5C"  }}>
                    <NumberFormat
                      value={product.price}
                      thousandSeparator={true}
                      displayType={"text"}
                      prefix="Kshs: "
                      suffix=" /="
                    />
                  </b>


              <h3 level={5}>Categorys': {product.category}</h3>
              <Title level={5}>Shipping': {product.category}</Title>

              <Title level={5}>Qty: </Title>
              <select
                defaultValue={qty}
                style={{ width: 120 }}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <Divider plain></Divider>
              {userInfo ? (
                <Row justify="space-around" style={{ margin: "2rem" }}>
                  <Button
                    style={{
                      display: "inline-block",
                      border: "0",
                      textDecoration: "none",
                      color: "black",
                    }}
                    block
                    size="large"
                    className="cart"
                    onClick={handleAddToCart}
                  >
                   <b style={{color:"white"}}>Add cart</b>
                  </Button>
                </Row>
              ) : (
                <aside>
                  <Button
                    type="primary"
                    className="cart"
                    onClick={showModal}
                    size="large"
                    style={{
                      border: "none",
                      textDecoration: "none",
                      margin: "1rem",
                    }}
                    block
                  >
                    <Title level={5}>SIGNIN TO CHECKOUT</Title>
                  </Button>
                  <Button
                    className="reverse__cart"
                    size="large"
                    style={{
                      border: "none",
                      textDecoration: "none",
                      margin: "1rem",
                    }}
                    block
                  >
                    <Title level={5}>CONTINUE SHOPPING</Title>
                  </Button>
                </aside>
              )}

              <Divider plain></Divider>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{ overflowY: "scroll" }}>
                <Title level={3}>Description</Title>
                <Text>{product.description}</Text>
              </Card>
            </Col>
          </Row>
        )}
        {/* <RecentItemsBar title="Related Items" /> */}
        {loadingCategory ? (
          
          <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
        ) : errorCategory ? (
          <div></div>
        ) : (
          <div>
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
            >
              {products.length === 0 ? (
                <Row justify="space-around" align="middle">
                  <Col>
                    <Empty description="No category"></Empty>
                  </Col>
                </Row>
              ) : (
                products.map((item) => (
                  <Row key={item.id} justify="space-around" align="middle">
                    <Col>
                      <a
                        href={`/product-detail/${item.id}/?category=${item.category}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card
                          style={{ height: "350px", border: "0" }}
                          cover={
                            <LazyLoadImage
                            src={"/"+item.image}
                            effect="blur"
                            alt="productimage"
                            style={{width:"auto", height:"auto", maxWidth: "15.8rem", maxHeight: "10.9rem", display:"flex", margin:"auto" }}
                            // visibleByDefault={product.image}
                          />
                          }
                        >
                          <Meta
                            title={item.product_name}
                            description={item.shop}
                          />

                          <Text level={3}>ksh {item.price}</Text>
                        </Card>
                      </a>
                    </Col>
                  </Row>
                ))
              )}
            </Carousel>
          </div>
        )}
      </main>
    </>
  );
}
