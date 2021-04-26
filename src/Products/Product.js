import { Col, Empty, Row,Form,Skeleton,Result } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../_actions/productActions";

const posts = [1, 2, 3, 4, 5];

const renderSkeleton = posts.map((post) => {
  return (
    <Col key={post}>
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

export default function Product(props) {
  const categoryDetail = useSelector((state) => state.categoryList);
  const { loadingCategory, products, errorCategory } = categoryDetail;

  const dispatch = useDispatch();

  console.log(props.match.params.category);
  useEffect(() => {
    dispatch(categoryProduct(props.match.params.category));
    return () => {};
  }, []);
  return (
    <div style={{ marginTop: "5rem" }}>
      {loadingCategory ? (
        <Row justify="space-around" align="middle">
            {renderSkeleton}
        </Row>
      ) : errorCategory ? (
        <Result
        status="500"
        subTitle={errorCategory}
        />
      ) : (
        <div>
          {products.length === 0 ? (
            <Row justify="space-around" align="middle">
              <Col>
                <Empty description="No category" />
              </Col>
            </Row>
          ) : (
            <div>
              {products.map((item) => (
                <h1>{item.product_name}</h1>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
