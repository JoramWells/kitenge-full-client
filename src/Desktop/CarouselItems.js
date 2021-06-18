import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Card, Result, Button } from "antd";
import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";
// import NumberFormat from "react-number-format";
import { DotsVerticalIcon, ThumbUpIcon } from "@heroicons/react/solid";
import Modal from "./modalComponent/Modal";

const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
      <Card loading style={{ height: "290px", width: "14rem" }} />
    </Col>
  );
});
export function CarouselItem() {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal((prev) => !prev);
  }

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
            width: "85%",
            float: "right",
            padding: "1.55rem",
            marginTop: "5rem",
            backgroundColor: "rgb(248,248,248,0.2)",
          }}
          className="flex flex-row flex-wrap justify-between items-center "
        >
          {posts.map((product) => (
            <div>
              <figure
                style={{ width: "14rem", border: "1px solid #F0F0F0 " }}
                className="rounded-md bg-white"
              >
                <div className="absolute bg-white bg-opacity-30  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20 z-10">
                  <DotsVerticalIcon className="h-5" onClick={openModal} />
                </div>
                <LazyLoadImage
                  src={product.image}
                  effect="blur"
                  alt="productimage"
                  style={{
                    width: "14rem",
                    height: "135px",
                    display: "block",
                    margin: "auto",
                  }}
                  className="rounded-t-sm -z-10"
                />
                <div className="p-2">
                  {product.product_name}
                  <figcaption>
                    <div className="font-semibold text-gray-600">
                      Kshs {product.price} /=
                    </div>
                    <div className="line-through text-sm text-gray-300">
                      Kshs 4,321/=
                    </div>
                  </figcaption>
                </div>
              </figure>
              <Modal showModal={showModal} setShowModal={setShowModal}>
                jay
              </Modal>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
