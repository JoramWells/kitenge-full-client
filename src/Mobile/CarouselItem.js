import React, {  lazy, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Form,
  Skeleton,
  message,
  Alert,
  Divider

} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
// import { listProducts } from "../../_actions/productActions";
import {
  EllipsisOutlined,
} from "@ant-design/icons";
import { addToCart } from "../_actions/cartActions";
import CarouselHeader from "../Generic/CarouselHeader"

const { Meta } = Card;
const { Text } = Typography;
const posts = [1, 2, 3, 4, 5];

const renderSkeleton = posts.map((post) => {
  return (
    <Col key={post}>
      <Form layout="vertical">
        <Form.Item>
          <Skeleton.Input style={{ width: "20rem", height: "150px" }} /> <br />
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

function CarouselItem(props) {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const productAddToCart = (productId, product_name) => {
    if (!userInfo) {
      message.warn("Redirecting to login page...");
      props.history.push("/login");
    } else {
      setTimeout(async()=>{
        await dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone))
        
      },2000)

      message.success(`${product_name} added to cart`);
    }
  };



  return (

      <main
        
        style={{ backgroundColor: "#F8F8F8", marginTop: "5rem" }}
      >
      <CarouselHeader />

        {loading ? (
          <Row justify="space-around" align="middle">
            {renderSkeleton}
          </Row>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
                    <Row justify="space-around" align="middle" gutter={[0, 16]}>
            {posts.map((item) => (
                            <Col key={item.id}>
                
                <Card
                  style={{ width: "18rem", height:"auto", backgroundColor:"#282c35"  }}
                  cover={
                    <LazyLoadImage
                      src={item.image}
                      effect="blur"
                      alt="product-Image"
                      style={{maxHeight:"16rem", maxWidth: "17.8rem",width:"auto", height:"auto", display:"flex", margin:"auto" }}
                    />
                  }
                 
                >
                  <Link
                    to={`/product-detail/${item.id}/?category=${item.category}`}
                  >
                    <Meta title={item.product_name} description={item.shop} />
                  </Link>
                  <Rate
                    name="size-small"
                    style={{ fontSize: "1rem", color: "#f9812a" }}
                    defaultValue={item.ratings}
                  />
                  <br />
                  <Text style={{ color: "grey", fontSize: "1rem" }}>
                    <b>ksh {item.price}</b>
                  </Text>
                  <Divider/>
                  <Row justify="space-around" align="middle">
                    <Col>
                    <Alert message="Buy" type="error" style={{ borderRadius:"5px", padding:".2rem"}} />

                    </Col>
                    <Col>2</Col>
                    <Col>
                    <EllipsisOutlined onClick={showModal} key="ellipsis" style={{transform:"rotate(90deg)"}}/>

                    </Col>
                  </Row>
                </Card>
                {/* <Modal
                                title="Product details"
                                visible={visible}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                              >
                                <Row justify="space-around" align="middle">
                                </Row>
                                <Row justify="space-around" align="middle">
                                <Button icon={<ShoppingCartOutlined />}  style={{marginTop:"0.5rem"}}>Add to cart</Button>
              
                                </Row>
                                
                              </Modal> */}
              </Col>
                                

            ))}
          </Row>

          </>

        )}

      </main>
  );
}

export default withRouter(CarouselItem);
