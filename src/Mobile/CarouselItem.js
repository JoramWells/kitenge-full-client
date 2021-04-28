import React, { lazy, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Rate,
  Form,
  Skeleton,
  message,
  Button,
  Image,
  Divider,
  Result,
} from "antd";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Ripples,{createRipples} from 'react-ripples'
// import { listProducts } from "../../_actions/productActions";
import {
  CloseCircleOutlined,
  EllipsisOutlined,
  ReloadOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { addToCart } from "../_actions/cartActions";
import CarouselHeader from "../Generic/CarouselHeader";
import Modal from "react-modal";

Modal.setAppElement("#root");
const { Meta } = Card;

const renderSkeleton = [...Array(5).keys()].map((i) => {
  return (
    <Col key={i}>
      <Card loading style={{width:"18rem", height:"17rem"}}>


      </Card>

    </Col>
  );
});

function CarouselItem(props) {
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("");

  const [description, setDescription] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const myRipples = createRipples({
    color:"rgba(255, 203, 5, 1)",
    during:"500"
  })

  const showModal = (item) => {
    setTimeout(()=>{
    setVisible(true);
    },500)
    
    setId(item.id);
    setImage(item.image);
    setDate(item.updatedAt);
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
    setRate(item.rate);
  };

  const handleCancel = () => {
    setTimeout(()=>{
setVisible(false);
    },1000)
    
  };
  const handleReload = () =>{
    window.location.reload()
  }

  const productAddToCart = (productId, product_name) => {
    if (!userInfo) {
      message.warn("Redirecting to login page...");
      props.history.push("/login");
    } else {
      setTimeout(async () => {
        await dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone));
      }, 2000);

      message.success(`${product_name} added to cart`);
    }
  };

  return (
    <main style={{ backgroundColor: "#F8F8F8", marginTop: "5rem" }}>
      <Modal
        isOpen={visible}
        onRequestClose={handleCancel}
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
            transitionDuration: "3s",
          },
          content: {
            marginTop: "3rem",
            height: "450px",

            margin: "auto",
            transition: "2s",
            transitionTimingFunction: "ease-in",
          },
        }}
      >
        <Row justify="end">
          <Col>
          <Ripples>
          <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}
              onClick={handleCancel}
            />
          </Ripples>

          </Col>
        </Row>
        <Row justify="space-around" align="middle">
          <Col>
            <Image
              src={image}
              style={{ width: "100px", borderRadius: "5px" }}
            />
          </Col>
        </Row>
        <div>
          <Link to={`/product-detail/${id}/?category=${category}`}>
            <h3 style={{ color: "rgba(232, 126, 4, 1)" }}> {name}</h3>
          </Link>
          <NumberFormat
            value={price}
            thousandSeparator={true}
            displayType={"text"}
            prefix="Kshs: "
            suffix=" /="
          />

          <Row>
            <Rate
              name="size-small"
              allowHalf={true}
              style={{
                fontSize: "1rem",
                color: "rgba(249, 180, 45,1)",
              }}
              defaultValue={rate}
            />
          </Row>

          <Divider />

          <address style={{ color: "grey", textAlign: "center" }}>
            {description}
          </address>
        </div>

        <Row justify="space-around" align="middle">
          <Col>
            <Button
              icon={<ShoppingOutlined style={{ fontSize: "1rem" }} />}
              style={{
                border: "0",
                backgroundColor: "rgba(252, 214, 112, 1)",
                color: "white",
              }}
            >
              {" "}
              <b>Purchase</b>{" "}
            </Button>
          </Col>
        </Row>
      </Modal>
      <CarouselHeader />

      {loading ? (
        <Row justify="space-around" align="middle" gutter={[0, 16]}>
          {renderSkeleton}
        </Row>
      ) : error ? (
        <Result
        status="500"
        subTitle={error}
        extra={<Button onClick={handleReload} icon={<ReloadOutlined/>}>RETRY</Button>}
        />
      ) : (
        <>
          <Row justify="space-around" align="middle" gutter={[0, 16]}>
            {posts.map((item) => (
              <Col key={item.id}>
                <Card
                  style={{
                    width: "17rem",
                    height: "auto",
                  }}
                  extra={
                    <Ripples>
                      <EllipsisOutlined
                      onClick={() => showModal(item)}
                      key="ellipsis"
                      style={{
                        fontSize: "1.3rem",
                      }}
                    />
                    </Ripples>

                  }
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
                  <Meta
                    title={
                      <Link
                        
                        to={`/product-detail/${item.id}/?category=${item.category}`}
                      >
                        <h3 style={{ color: "rgba(232, 126, 4, 1)",margin:"0" }}> {item.product_name}</h3>
                      </Link>
                    }
                    description={
                      <Rate
                        name="size-small"
                        allowHalf={true}
                        style={{
                          fontSize: "1rem",
                          color: "rgba(255, 203, 5, 1)",
                          marginBottom: ".6rem",
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
    </main>
  );
}

export default withRouter(CarouselItem);
