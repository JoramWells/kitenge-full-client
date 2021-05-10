import React, { useEffect, memo } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Card, Skeleton, Form, Result, Button, Rate } from "antd";
import CarouselHeader from "../Generic/CarouselHeader";
import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";

const renderSkeleton = [...Array(4).keys()].map((i) => {
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
  }, []);
  return (
    <>
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
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          dotListClass="custom-dot-list-style"
          // arrows={false} 
          renderButtonGroupOutside={true}
        >
          {posts.map((product) => (
            <Row key={product.id} justify="center" style={{ margin: "1rem" }}>
              <Link
                to={`/product-detail/${product.id}/?category=${product.category}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  style={{
                    width: "13rem",
                    height: "290px",
                  }}
                  cover={
                    <LazyLoadImage
                      src={product.image}
                      effect="blur"
                      alt="productimage"
                      style={{
                        width: "12.8rem",
                        height: "9.9rem",
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
                        color: "#282c35",
                        margin: "0",
                        fontSize: "0.9rem",
                      }}
                    >
                      {product.product_name}
                    </p>
                  </Link>
                  <Rate
                    allowHalf={true}
                    style={{
                      fontSize: "1rem",
                      color: "rgba(211, 84, 0, 1)",

                      marginBottom: ".6rem",
                    }}
                    defaultValue={product.ratings}
                  />
                  <p
                    style={{
                      color: "grey",
                      fontSize: ".8rem",
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
                  </p>
                </Card>
              </Link>
            </Row>
          ))}
        </Carousel>
      )}
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
