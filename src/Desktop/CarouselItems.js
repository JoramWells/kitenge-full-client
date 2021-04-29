import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Row,
  Col,
  Typography,
  Card,
  Skeleton,
  Form,
  Result,
  Button,
  Rate
} from "antd";
import CarouselHeader from "../Generic/CarouselHeader";
import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

const { Meta } = Card;
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

export default function CarouselItems() {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const reloadHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);
  return (
    <main style={{ padding: "20px" }}>
      <CarouselHeader />
      <RecentItemsBar title="Available Now!!" />
      {loading ? (
        <Row justify="space-around" align="middle">
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
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
        >
          {posts.map((product) => (
            <Row key={product.id} justify="space-around" align="middle">
              <Col>
                <Link
                  to={`/product-detail/${product.id}/?category=${product.category}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      border: "0",
                      width: "15rem",
                      height: "340px",
                    }}
                    cover={
                      <LazyLoadImage
                        src={product.image}
                        effect="blur"
                        alt="productimage"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxWidth: "14.8rem",
                          maxHeight: "13.9rem",
                          display: "flex",
                          margin: "auto",
                        }}
                        // visibleByDefault={product.image}
                      />
                    }
                  >
                    <Meta
                      title={
                        <Link
                        style={{ color: "rgba(89, 171, 227, 1)" }}
                        to={`/product-detail/${product.id}/?category=${product.category}`}
                      >
                        {product.product_name}
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
                        defaultValue={product.ratings}
                      />
                      }
                    />{" "}
                    <b style={{ color: "grey" }}>
                    <NumberFormat
                      value={product.price}
                      thousandSeparator={true}
                      displayType={"text"}
                      prefix="Kshs: "
                      suffix=" /="
                    />
                  </b>
                  </Card>
                </Link>
              </Col>
            </Row>
          ))}
        </Carousel>
      )}
    </main>
  );
}
