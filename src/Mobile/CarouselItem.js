import React, { useState, memo } from "react";
import { Col, message, Divider } from "antd";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import { listProducts } from "../../_actions/productActions";
import { addToCart } from "../_actions/cartActions";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import Modal from "../Desktop/modalComponent/Modal";
// import { likedItem } from "../_actions/likedActions";

function CarouselIte({ products }) {
  const { id, product_name, image, price, views, src } = products;
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

  return (
    <Col key={id} className="mb-4">
      <figure
        className="shadow-md bg-white"
        onMouseEnter={() => setDot("visible")}
        onMouseLeave={() => setDot("hidden")}
      >
        {/* <div className="absolute bg-yellow-500 px-2 bg-opacity-40 rounded-br-md font-bold text-gray-300">
        20
      </div> */}
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
        <div className="p-2">
          <div className="text-gray-500 font-medium">{product_name}</div>
          <div>
            <p className="text-gray-700 font-medium  m-0">
              <NumberFormat
                value={price}
                thousandSeparator={true}
                displayType={"text"}
                prefix="Kshs: "
                suffix=" /="
              />
            </p>
          </div>

          <Divider style={{ margin: ".5rem" }} />
          <div className="text-gray-400 justify-between flex">
            <div className="flex flex-row">21views{views}</div>
            <p className="m-0">Sold 93</p>
          </div>
        </div>
      </figure>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="flex flex-col p-2">
          <div className="flex flex-col content-center justify-center">
            <div className="text-gray-700 font-semibold text-lg">
              {product_name}
            </div>
            <div className="text-gray-500">{price}</div>
            <div>Umoja</div>
            <div>2 min(s) out</div>
          </div>

          <div className="flex flex-row justify-center content-center space-x-2">
            <button className="bg-black bg-opacity-80 w-full py-1 rounded-md">
              Buy
            </button>
            <button className="w-full bg-black bg-opacity-20 py-1 rounded-md">
              Add to cart
            </button>
          </div>
        </div>
      </Modal>
    </Col>
  );
}

export const CarouselItem = memo(CarouselIte);
