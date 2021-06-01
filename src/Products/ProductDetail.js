import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import NumberFormat from "react-number-format";

import {
  Row,
  Col,
  Button,
  Card,
  Divider,
  Rate,
  Image,
  Skeleton,
  Form,
  Empty,
  Result,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { categoryProduct, detailsProduct } from "../_actions/productActions";

// import RecentItemsBar from "../RecentItemsBar";

import RecentItemsBar from "../Generic/RecentItemsBar";
import { EyeOutlined, LikeFilled, RedoOutlined } from "@ant-design/icons";
import { getByDisplayValue } from "@testing-library/dom";

export default function ProductDetail(props) {
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
            <Skeleton.Input style={{ width: "16rem", height: "150px" }} />{" "}
            <br />
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
  }, [dispatch]);

  function loginHandler() {
    props.history.push("/login");
  }

  function handleAddToCart() {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  }
  function reloadHandler() {
    window.location.reload();
  }

  return (
    <>
      <div className="m-auto block">
        <div className="flex flex-row justify-center items-center content-center">
          <div>
            {loading ? (
              <Row
                justify="space-around"
                align="middle"
                style={{ padding: "10px", marginTop: "2rem" }}
              >
                <Col md={6} sm={6}>
                  <Skeleton.Image
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
                <Col md={6} sm={6} style={{ marginTop: "2rem" }}>
                  <Form>
                    <Form.Item>
                      <Skeleton.Input
                        style={{ width: "250px", height: "1rem" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Skeleton.Input
                        style={{ width: "150px", height: "1rem" }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Skeleton.Input
                        style={{ width: "200px", height: "1rem" }}
                      />
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
                extra={
                  <Button onClick={reloadHandler} icon={<RedoOutlined />}>
                    RETRY
                  </Button>
                }
              />
            ) : (
              <div className="m-4 flex flex-row flex-wrap sm:flex-col space-x-4">
                <div className="flex lg:flex-row sm:flex-col flex-wrap bg-white shadow-md p-2 rounded-md justify-around mr-auto w-full">
                  <div>
                    <p className="text-gray-600 m-0 font-bold text-lg">
                      {product.product_name}
                    </p>
                    <Image
                      src={"/" + product.image}
                      alt="shoes again"
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="flex flex-col p-4">
                    <p className="text-blue-400 text-md m-0">
                      <NumberFormat
                        value={product.price}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix="Kshs: "
                        suffix=" /="
                      />
                    </p>
                    <p className="text-gray-400 m-0 text-sm">Reviews: (123) </p>
                    <Rate
                      style={{ color: "#434343", fontSize: "1rem" }}
                      disabled
                      allowHalf
                      defaultValue={product.ratings}
                    />
                    <Divider plain style={{ margin: ".5rem" }}></Divider>

                    <p style={{ margin: "0" }}>
                      Categorys': {product.category}
                    </p>
                    <span style={{ color: "grey", margin: "0" }}>
                      Shipping: 350/=
                    </span>
                    <p>Qty: {product.stock}</p>
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
                    <Divider style={{ marginTop: ".5rem" }} />
                    {userInfo ? (
                      <Row justify="space-around" style={{ margin: "1rem" }}>
                        <Button
                          style={{
                            border: "0",
                            textDecoration: "none",
                            color: "white",
                          }}
                          block
                          size="large"
                          className="cart"
                          onClick={handleAddToCart}
                        >
                          ADD TO CART
                        </Button>
                      </Row>
                    ) : (
                      <>
                        <div className="flex lg:flex-row md:flex-col space-x-4">
                          <button
                            onClick={loginHandler}
                            className="transition hover:shadow-lg focus-within:shadow-lg duration-150 ease-out-in p-2 focus:outline-none focus-within:bg-yellow-500 bg-black rounded-full bg-opacity-20 hover:bg-yellow-500 font-extrabold text-white"
                          >
                            SignIn & Checkout
                          </button>
                          <button className="transition hover:shadow-lg focus-within:shadow-lg duration-150 ease-out-in p-2 focus:outline-none focus-within:bg-yellow-500 bg-green-500 rounded-full hover:bg-yellow-500 font-extrabold text-white">
                            Continue Shopping
                          </button>
                        </div>
                      </>
                    )}
                    <Divider />
                  </div>
                  {/* <Col>
                    <Card
                      style={{
                        width: "18rem",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </Card>
                  </Col> */}
                </div>
              </div>
            )}
          </div>
          <div
            className=""
            style={{
              backgroundColor: "white",
              height: "200px",
              width: "25rem",
            }}
          >
            Fulex
          </div>
        </div>
      </div>

      <RecentItemsBar title="Related Items" />
      {loadingCategory ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : errorCategory ? (
        <></>
      ) : (
        <div
          style={{
            maxWidth: "85%",
            margin: "auto",
            display: "block",
            alignItems: "center",
          }}
        >
          {products.length === 0 ? (
            <Row justify="space-around" align="middle">
              <Col>
                <Empty description="No category"></Empty>
              </Col>
            </Row>
          ) : (
            <Row
            className=" p-2 rounded-md "
              justify="space-around"
              gutter={[0, 16]}
              style={{ marginTop: "2rem", paddingBottom: "2rem" }}
            >
              {products.map((item) => (
                <Col key={item.id}>
                  <Card
                    className="hover:shadow-lg cursor-pointer hover:rounded-md"

                    style={{
                      width: "15rem",
                      height: "290px",
                      border: "none",
                    }}
                    cover={
                      <LazyLoadImage
                        src={"/" + item.image}
                        effect="blur"
                        alt="productimage"
                        style={{
                          width: "14.8rem",
                          height: "10.5rem",
                          display: "flex",
                          margin: "auto",
                        }}
                        // visibleByDefault={product.image}
                      />
                    }
                  >
                    <Link
                      to={`/product-detail/${item.id}/?category=${item.category}`}
                      className="m-0 text-gray-700 text-sm"

                    >
                        {item.product_name}
                    </Link>
                    {/* <Rate
                      allowHalf={true}
                      style={{
                        fontSize: "1rem",
                        color: "#434343",

                        marginBottom: ".6rem",
                      }}
                      defaultValue={item.ratings}
                    /> */}
                    <p
                    className="text-gray-700 font-medium m-0"

                    >
                      <NumberFormat
                        value={item.price}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix="Kshs: "
                        suffix=" /="
                      />
                    </p>
                    <div
                    className="flex space-x-4 items-center content-center bg-gray-50 rounded-sm p-1"
                    >
                      <div className="flex items-center">
                        <EyeOutlined style={{ color: "grey" }} />{" "}
                        <LikeFilled style={{ color: "#bfbfbf" }} />{" "}
                        <span style={{ color: "grey" }}>{item.likes}</span>
                      </div>
                      <div className="text-gray-300">Sold 93</div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
}
