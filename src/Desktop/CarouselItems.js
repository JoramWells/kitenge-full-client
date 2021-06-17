import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Card, Result, Button } from "antd";
import RecentItemsBar from "../Generic/RecentItemsBar";
import { RedoOutlined } from "@ant-design/icons";
// import NumberFormat from "react-number-format";
import { DotsVerticalIcon, ThumbUpIcon } from "@heroicons/react/solid";

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
        <div style={{width:"90%"}} className="flex flex-wrap space-x-10 items-center justify-center">
          {posts.map((product) => (
            <figure
              style={{ width: "14rem", border: "1px solid #F0F0F0 " }}
              className="rounded-md bg-white"
            >
              <div className="absolute bg-black bg-opacity-20  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20 ">
                <DotsVerticalIcon
                  className="h-5"
                  //  onClick={() => setOpen(true)}
                />
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
                className="rounded-t-sm"
              />
              <div className="p-2">
                {/* <blockquote style={{hid:"hidden"}} >{id}</blockquote> */}

                <p style={{ color: "#00ADAD" }}>{product.product_name}</p>
                <figcaption>
                  <div>
                    <p className="font-semibold text-gray-600">
                      Kshs {product.price} /=
                    </p>
                  </div>
                  <div className="line-through text-sm text-gray-300">
                    Kshs 4,321/=
                    {product.likes}
                  </div>
                  <div className="flex flex-row items-center justify-between content-center mt-2 text-gray-400">
                    <div className="text-sm">12mins</div>
                    <div className="flex flex-row items-center">
                      <div className="text-sm">{product.id}31</div>

                      <ThumbUpIcon className="h-5 " />
                    </div>
                  </div>
                </figcaption>
              </div>
            </figure>
            // <div
            //   key={product.id}
            //   className="flex items-center p-2 content-center bg-white rounded-md mb-4 mt-4"
            // >
            //   <Link
            //     to={`/product-detail/${product.id}/?category=${product.category}`}
            //     style={{ textDecoration: "none" }}
            //   >
            //     <Card
            //       style={{
            //         width: "15rem",
            //         height: "290px",
            //         border: "none",
            //       }}
            //       cover={
            //         <LazyLoadImage
            //           src={product.image}
            //           effect="blur"
            //           alt="productimage"
            //           style={{
            //             width: "14.8rem",
            //             height: "10.5rem",
            //             display: "flex",
            //             margin: "auto",
            //           }}
            //         />
            //       }
            //       className="hover:shadow-lg hover:rounded-md"
            //     >
            //       <Link
            //         to={`/product-detail/${product.id}/?category=${product.category}`}
            //         className="m-0 text-gray-700 text-sm"
            //       >{product.product_name}

            //       </Link>
            //       {/* <Rate
            //         allowHalf={true}
            //         style={{
            //           fontSize: "1rem",
            //           color: "#434343",

            //           marginBottom: ".6rem",
            //         }}
            //         defaultValue={product.ratings}
            //       /> */}
            //       <p
            //       className="text-gray-700 font-medium m-0"

            //       >
            //         <NumberFormat
            //           value={product.price}
            //           thousandSeparator={true}
            //           displayType={"text"}
            //           prefix="Kshs: "
            //           suffix=" /="
            //         />
            //       </p>
            //       {/* <Divider style={{ margin: "0.7rem" }} /> */}

            //       <div
            //       className="flex space-x-4 items-center content-center bg-gray-50 rounded-sm p-1"
            //       >
            //         <div className="flex items-center">
            //           <EyeOutlined style={{ color: "grey" }} />{" "}
            //           <LikeFilled style={{ color: "#bfbfbf" }} />{" "}
            //           <span style={{ color: "grey" }}>{product.likes}</span>
            //         </div>
            //         <div className="text-gray-300">Sold 93</div>
            //       </div>
            //     </Card>
            //   </Link>
            // </div>
          ))}
          {/* </Carousel> */}
        </div>
      )}
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
