import { EllipsisOutlined } from "@ant-design/icons";
import {
  Col,
  Empty,
  Row,
  Form,
  Skeleton,
  Result,
  Rate,
  Card,
} from "antd";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../_actions/productActions";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
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
const { Meta } = Card;
export default function Product(props) {
  // const history = useHistory();
  const categoryDetail = useSelector((state) => state.categoryList);
  const { loadingCategory, products, errorCategory } = categoryDetail;

  const dispatch = useDispatch();

  // const closeHandler = () => {
  //   history.goBack();
  // };
  useEffect(() => {
    dispatch(categoryProduct(props.match.params.category));
    return () => {};
  }, [dispatch]);
  return (
    <main style={{ marginTop: "5rem" }}>
      {loadingCategory ? (
        <Row justify="space-around" align="middle">
          {renderSkeleton}
        </Row>
      ) : errorCategory ? (
        <Result status="500" subTitle={errorCategory} />
      ) : (
        <div>
          {products.length === 0 ? (
            <Row justify="space-around" align="middle">
              <Col>
                <Empty description="No category" />
              </Col>
            </Row>
          ) : (
            <>
              {/* <Row justify="end" style={{ width:"22rem", marginBottom:"1rem"}}>
            <Col>
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "0.3rem", position:"fixed" }}
              onClick={closeHandler}
            />
          </Col>
            </Row> */}
              <Row
                justify="space-around"
                align="middle"
                gutter={[0, 16]}
                style={{ backgroundColor: "whitesmoke" }}
              >
                {products.map((item) => (
                  <Col key={item.id}>
                    <Card
                      style={{
                        width: "17rem",
                        height: "auto",
                      }}
                      cover={
                        <LazyLoadImage
                          src={"/" + item.image}
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
                      extra={
                        <EllipsisOutlined
                          // onClick={() => showModal(item)}
                          key="ellipsis"
                          style={{
                            fontSize: "1.3rem",
                          }}
                        />
                      }
                    >
                      <Meta
                        title={
                          <Link
                            to={`/product-detail/${item.id}/?category=${item.category}`}
                          >
                            <h3
                              style={{
                                color: "rgba(232, 126, 4, 1)",
                                margin: "0",
                              }}
                            >
                              {item.product_name}
                            </h3>
                          </Link>
                        }
                        description={
                          <Rate
                            name="size-small"
                            style={{
                              fontSize: "1rem",
                              color: "rgba(232, 126, 4, 1)",
                              marginBottom: ".3rem",
                            }}
                            defaultValue={item.ratings}
                          />
                        }
                      />

                      <h3 style={{ color: "grey" }}>
                        <NumberFormat
                          value={item.price}
                          thousandSeparator={true}
                          displayType={"text"}
                          prefix="Kshs: "
                          suffix=" /="
                        />
                      </h3>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      )}
    </main>
  );
}
