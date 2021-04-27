import { CloseCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Col, Empty, Row,Form,Skeleton,Result, Button, Rate, Card } from "antd";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../_actions/productActions";
import {Link, useHistory} from 'react-router-dom'

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
  const history = useHistory();
  const categoryDetail = useSelector((state) => state.categoryList);
  const { loadingCategory, products, errorCategory } = categoryDetail;

  const dispatch = useDispatch();

  const closeHandler = () => {
    history.goBack();
  };
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
            <>
            <Row justify="end" style={{ width:"22rem", marginBottom:"1rem"}}>
            <Col>
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "0.3rem", position:"fixed" }}
              onClick={closeHandler}
            />
          </Col>
            </Row>
            <Row justify="space-around" align="middle" gutter={[0,16]} style={{backgroundColor:"whitesmoke"}}>
                
                {products.map((item) => (
                  
                  <Col key={item.id}>
                  <Card
                    style={{
                      width: "17rem",
                      height: "auto",
                    }}
                    cover={
                      <LazyLoadImage
                        src={item.image}
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
                  >
                    <Link
                      to={`/product-detail/${item.id}/?category=${item.category}`}
                    >
                    <h2 
                      style={{color:"#0080ff"}}
  
                    >{item.product_name}</h2>
  
                    </Link>
                    <Rate
                      name="size-small"
                      style={{ fontSize: "1rem", color: "#f9812a" }}
                      defaultValue={item.ratings}
                    />
                    <br />
                    <h3 style={{ color: "grey" }}>
                      <b>ksh {item.price}</b>
                    </h3>
                    <Row justify="space-between" align="middle">
                      <Col>
                      <Button style={{borderRadius:"7px"}}>BUY</Button>
  
                      </Col>
                      <Col>
                        <EllipsisOutlined
                          key="ellipsis"
                          style={{ transform: "rotate(90deg)", fontSize:"1.5rem"}}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                ))}
              </Row>
                
            </>
          )}
        </div>
      )}
    </div>
  );
}
