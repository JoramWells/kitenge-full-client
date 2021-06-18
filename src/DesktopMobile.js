import React, { useEffect } from "react";
import { CarouselItem } from "./Mobile/CarouselItem";
import { CarouselItems } from "./Desktop/CarouselItems";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Result, Row } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { listProducts } from "./_actions/productActions";
const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
      <Card loading style={{ height: "290px", width: "14rem" }} />
    </Col>
  );
});

export default function DesktopMobile() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, [dispatch]);
  function reloadHandler() {
    window.location.reload();
  }

  return (
    <>
      <div className="mobile__carousel">
        <CarouselItem />
      </div>
      <div className="desktop__carousel">
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
          <div
            style={{
              width: "83%",
              float: "right",
              marginTop: "5rem",
              padding: "1.55rem",
              backgroundColor: "rgb(248,248,248,0.2)",
            }}
          >
            <div className="flex flex-row flex-wrap items-center justify-between ">
              {posts.map((product) => (
                <CarouselItems product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
