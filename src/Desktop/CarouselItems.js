import React, { useEffect, memo } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Card, Result, Button, Rate, Divider } from "antd";
import RecentItemsBar from "../Generic/RecentItemsBar";
import {
  EyeOutlined,
  HeartFilled,
  LikeFilled,
  RedoOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";

const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
      <Card loading style={{ height: "290px", width: "14rem" }} />
    </Col>
  );
});

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function CarouselItem() {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  function reloadHandler() {
    window.location.reload();
  }

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, [dispatch]);
  return (
    <>

      <RecentItemsBar title="Most popular" />
      {loading ? (
        <Row
          justify="space-around"
          align="middle"
          style={{ marginTop: "1rem" }}
        >
          {renderSkeleton}
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
        <div style={{ maxWidth: "85%", margin: "auto", display: "block" }}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
          
          >
            {posts.map((product) => (
              <Row
                key={product.id}
                justify="center"
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                  backgroundColor:"white",
                  borderRadius:"5px",
                  padding:"1rem"
                }}
              >
                <Link
                  to={`/product-detail/${product.id}/?category=${product.category}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      width: "15rem",
                      height: "290px",
                      border: "none",
                    }}
                    cover={
                      <LazyLoadImage
                        src={product.image}
                        effect="blur"
                        alt="productimage"
                        style={{
                          width: "14.8rem",
                          height: "10.5rem",
                          display: "flex",
                          margin: "auto",
                        }}
                      />
                    }
                    className="hover:shadow-lg hover:rounded-md"
                  >
                    <Link
                      to={`/product-detail/${product.id}/?category=${product.category}`}
                      className="m-0 text-gray-700 text-sm"
                    >{product.product_name}

                    </Link>
                    {/* <Rate
                      allowHalf={true}
                      style={{
                        fontSize: "1rem",
                        color: "#434343",

                        marginBottom: ".6rem",
                      }}
                      defaultValue={product.ratings}
                    /> */}
                    <p
                    className="text-gray-700 font-medium m-0"

                    >
                      <NumberFormat
                        value={product.price}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix="Kshs: "
                        suffix=" /="
                      />
                    </p>
                    {/* <Divider style={{ margin: "0.7rem" }} /> */}

                    <div
                    className="flex space-x-4 items-center content-center bg-gray-100 rounded-sm p-1"
                    >
                      <div className="flex items-center">
                        <EyeOutlined style={{ color: "grey" }} />{" "}
                        <LikeFilled style={{ color: "#bfbfbf" }} />{" "}
                        <span style={{ color: "grey" }}>{product.likes}</span>
                      </div>
                      <div className="text-gray-300">Sold 93</div>
                    </div>
                  </Card>
                </Link>
              </Row>
            ))}
          </Carousel>
        </div>
      )}

      <RecentItemsBar title="Available Now!!" />
      {loading ? (
        <Row
          justify="space-around"
          align="middle"
          style={{ marginTop: "1rem" }}
        >
          {renderSkeleton}
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
        <div style={{ maxWidth: "85%", margin: "auto", display: "block" }}>
          <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            arrows={false}
            renderButtonGroupOutside={true}
          >
            {posts.map((product) => (
              <Row
                key={product.id}
                justify="center"
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  alignItems: "center",
                  backgroundColor:"white",
                  borderRadius:"5px",
                  padding: "1rem"
                }}
              >
                <Link
                  to={`/product-detail/${product.id}/?category=${product.category}`}
                  style={{ textDecoration: "none" }}
                >
                 <Card
                    style={{
                      width: "15rem",
                      height: "290px",
                      border: "none",
                    }}
                    cover={
                      <LazyLoadImage
                        src={product.image}
                        effect="blur"
                        alt="productimage"
                        style={{
                          width: "14.8rem",
                          height: "10.5rem",
                          display: "flex",
                          margin: "auto",
                        }}
                      />
                    }
                  >
                    <Link
                      to={`/product-detail/${product.id}/?category=${product.category}`}
                    >
                      <p
                        style={{
                          color: "grey",
                          margin: "0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {product.product_name}
                      </p>
                    </Link>
                    {/* <Rate
                      allowHalf={true}
                      style={{
                        fontSize: "1rem",
                        color: "#434343",

                        marginBottom: ".6rem",
                      }}
                      defaultValue={product.ratings}
                    /> */}
                    <b
                      style={{
                        color: "#595a5c",
                        fontSize: ".9rem",
                        margin: "0",
                      }}
                    >
                      <NumberFormat
                        value={product.price}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix="Kshs: "
                        suffix=" /="
                      />
                    </b>
                    {/* <Divider style={{ margin: "0.7rem" }} /> */}

                    <Row
                      justify="space-between"
                      style={{ marginTop: "0.4rem" }}
                    >
                      <Col>
                        <EyeOutlined style={{ color: "grey" }} />{" "}
                        <LikeFilled style={{ color: "#bfbfbf" }} />{" "}
                        <HeartFilled style={{ color: "#ff7875" }} />{" "}
                        <span style={{ color: "grey" }}>{product.likes}</span>
                      </Col>
                      <Col style={{ color: "grey" }}>Sold 93</Col>
                    </Row>
                  </Card>
                </Link>
              </Row>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
