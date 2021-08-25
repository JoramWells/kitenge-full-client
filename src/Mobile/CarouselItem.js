import React, { useState } from "react";
import { Col, message } from "antd";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter, Link } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import { listProducts } from "../../_actions/productActions";
import { addToCart } from "../_actions/cartActions";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import Modal from "../Desktop/modalComponent/Modal";
import { useAvatar, useViews } from "../hooks/useViews";
import moment from "moment";
import Btn from "../buttonComponent/Button";
import MobileFooter from "./MobileFooter";

// import { likedItem } from "../_actions/likedActions";

function CarouselItem({ props, products }) {
  const {
    id,
    product_name,
    image,
    price,
    category,
    description,
    src,
    userId,
    updatedAt,
  } = products;
  const views = useViews(id);
  const avatar = useAvatar(userId);
  const [dot, setDot] = useState("hidden");
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  async function openModal(product_id) {
    setShowModal((prev) => !prev);
    // await axios
    //   .post("/aidata", {
    //     user_info: ip,
    //     product_id: product_id,
    //   })
    //   .catch((err) => console.log(err));
  }

  const productAddToCart = (productId, product_name) => {
    if (!userInfo) {
      message.warn("Redirecting to login page...");
      history.go("/login");
    } else {
      setTimeout(async () => {
        await dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone));
      }, 2000);

      message.success(`${product_name} added to cart`);
    }
  };
  // console.log(RequestIp.getClientIp)
  const handleAddToCart = () => {
    history.push("/cart/" + id + "?qty=" + 1);
  };

  return (
    <>
      <Col key={id} className="mb-2">
        <figure
          className="bg-white"
          onMouseEnter={() => setDot("visible")}
          onMouseLeave={() => setDot("hidden")}
        >
          <div
            className="absolute mx-auto bg-black p-2 top-0 right-0 bg-opacity-20 rounded-full z-5"
            style={{ visibility: dot }}
          >
            <DotsVerticalIcon
              className="h-5 text-gray-200 active:text-red-400"
              onClick={() => openModal(id)}
            />
          </div>
          <img
            alt={src}
            loading="lazy"
            src={image}
            style={{ width: "18rem", height: "12rem", zIndex: "-1" }}
          />
          <div className="p-1 flex flex-row space-x-4">
            <img
              loading="lazy"
              effect="blur"
              src={avatar}
              alt=""
              className="rounded-full"
              style={{ width: "30px", height: "30px" }}
            />
            <div>
              <Link
                className="text-gray-800 font-bold"
                to={`/product-detail/${id}/?category=${category}`}
              >
                {product_name}
              </Link>
              <div className="flex flex-row items-center space-x-2">
                <p className="text-gray-700 font-medium  m-0">
                  <NumberFormat
                    value={price}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix="Kshs: "
                    suffix=" /="
                  />
                </p>
                <p className="text-gray-400 font-medium text-xs  m-0 line-through">
                  <NumberFormat
                    value={price}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix="Kshs: "
                    suffix=" /="
                  />
                </p>
              </div>

              <div className="flex flex-row text-xs text-gray-400 mt-1">
                {views} views | {moment(updatedAt).fromNow("yyyy")}
              </div>
            </div>
          </div>
        </figure>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="flex flex-col p-2">
            <div className="mobile__modal">
              <Link
                className="text-gray-800 font-bold text-xl"
                to={`/product-detail/${id}/?category=${category}`}
              >
                {product_name}
              </Link>
              <div className="text-gray-800">Price: Kshs {price}/=</div>
              <div className="text-gray-500 line-through text-xs">
                Price: Kshs {price}/=
              </div>

              <div>Location: Umoja | Time out: 2 min(s)</div>
              <div style={{ height: 50, overflowY: "scroll", marginTop: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </div>
            <div className="flex flex-row justify-center content-center space-x-2">
              <Btn
                text="Cart"
                buttonStyle="btn-primary-solid"
                onClick={handleAddToCart}
              />
              <Btn text="Buy" buttonStyle="" onClick={handleAddToCart} />
            </div>
          </div>
        </Modal>
      </Col>
      <MobileFooter />
    </>
  );
}

export default withRouter(CarouselItem);
