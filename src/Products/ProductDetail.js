import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
import NumberFormat from "react-number-format";

import {
  Button,
  Divider,
  Rate,
  Empty,
  Result,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { categoryProduct, detailsProduct } from "../_actions/productActions";

import { RedoOutlined } from "@ant-design/icons";
import { PlusIcon } from "@heroicons/react/outline";
import styled from "styled-components";
import DesktopNavbarMobile from "../DesktopNavbarMobile";

function reloadHandler() {
  window.location.reload();
}
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

  return (
    <>
      <DesktopNavbarMobile />
      <div className="m-auto block" style={{ paddingTop: "1rem" }}>
        <div className="flex flex-row justify-center items-center content-center">
          <div>
            {loading ? (
              <div className="details">
                <div className="details-item">
                  <div>
                    <div className="details-div"></div>
                    <div className="details-img"></div>
                  </div>
                  <div>
                    <div className="details-div"></div>
                    <div className="details-reviews"></div>
                    <div className="details-div"></div>
                    <div className="details-category"></div>
                  </div>
                </div>
                <div className="description"></div>
              </div>
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
              <Row className="m-4">
                <Flex className="bg-white p-2 rounded-md">
                  <div>
                    <p className="text-gray-600 m-0 font-bold text-lg">
                      {product.product_name}
                    </p>
                    <img
                      src={"/" + product.image}
                      alt={product.image}
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
                      <Row style={{ margin: "1rem" }}>
                        <button
                          style={{
                            border: "0",
                            textDecoration: "none",
                            color: "white",
                            backgroundColor: "#47817F",
                          }}
                          className="w-full p-2 flex flex-row rounded-md"
                          onClick={handleAddToCart}
                        >
                          <PlusIcon className="h-5" />
                          ADD TO CART
                        </button>
                      </Row>
                    ) : (
                      <>
                        <div className="flex lg:flex-row md:flex-col space-x-4">
                          <button
                            onClick={loginHandler}
                            className="bg-black opacity-80 transition hover:shadow-lg focus-within:shadow-lg duration-150 ease-out-in p-2 focus:outline-none  rounded-md  text-white"
                          >
                            SignIn & Checkout
                          </button>
                          <button
                            style={{ backgroundColor: "#F4C430" }}
                            className="transition hover:shadow-lg focus-within:shadow-lg duration-150 ease-out-in p-2 focus:outline-none bg-black bg-opacity-50 rounded-md text-white"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </>
                    )}
                    <Divider />
                  </div>
                </Flex>
              </Row>
            )}
          </div>
          <div
            style={{
              backgroundColor: "white",
            }}
          >
            <h1 className="text-lg m-0 p-1 text-center">Related Items</h1>
            <div
              style={{
                height: "317px",
                width: "17rem",
                overflowY: "scroll",
              }}
            >
              {loadingCategory ? (
                <div>Loading...</div>
              ) : errorCategory ? (
                <>err</>
              ) : (
                <div
                  style={{
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {products.length === 0 ? (
                    <Row>
                      <Empty description="No category"></Empty>
                    </Row>
                  ) : (
                    <Row
                      className=" rounded-md bg-white"
                      style={{ paddingBottom: "2rem" }}
                    >
                      {products.map((item) => (
                        <figure
                          key={item.id}
                          className="rounded-md bg-white ring-1 ring-gray-100 cursor-pointer hover:rounded-md"
                          style={{
                            width: "11rem",
                            height: "177px",
                            border: "none",
                          }}
                        >
                          <LazyLoadImage
                            src={"/" + item.image}
                            effect="blur"
                            alt="productimage"
                            style={{
                              width: "11rem",
                              height: "7.5rem",
                              display: "flex",
                              margin: "auto",
                            }}
                            // visibleByDefault={product.image}
                          />
                          <div className="p-2">
                            <Link
                              to={`/product-detail/${item.id}/?category=${item.category}`}
                              className="m-0 text-gray-700 text-sm"
                            >
                              {item.product_name}
                            </Link>
                            <div className="text-gray-700 font-medium m-0">
                              <NumberFormat
                                value={item.price}
                                thousandSeparator={true}
                                displayType={"text"}
                                prefix="Kshs: "
                                suffix=" /="
                              />
                            </div>
                          </div>
                        </figure>
                      ))}
                    </Row>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 43rem;
  @media (max-width: 767px) {
    display: fixed;
    flex-direction: row;
    flex-wrap: wrap;
    width: 23rem;
  }
`;
