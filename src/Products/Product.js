import { Col, Empty, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../_actions/productActions";

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
        <div>Loading</div>
      ) : errorCategory ? (
        <div>error</div>
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
