import React, { useState, memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import NumberFormat from "react-number-format";
import axios from "axios";
import {
  ClockIcon,
  CreditCardIcon,
  DotsVerticalIcon,
  LocationMarkerIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import Modal from "./modalComponent/Modal";

export function CarouselItem({ product }) {
  const { id, product_name, image, price, description } = product;
  const [showModal, setShowModal] = useState(false);
  const [ip, setIP] = useState("");

  const [dot, setDot] = useState("hidden");
  async function openModal(product_id) {
    setShowModal((prev) => !prev);
    await axios
    .post("/aidata", {
      user_info: ip,
      product_id: product_id,
      start_time: new Date(),
      stop_time: new Date(),
    })
    .catch((err) => console.log(err));
  }
  const getIP = useCallback(async () => {
    await axios
      .get("https://api.ipify.org/")
      .then((res) => setIP(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getIP();
  }, []);
  const handleMouseEnter = (product_id) => {
    console.log(product_id)
    // setTimeout(async () => {
    //   await axios
    //     .post("/aidata", {
    //       user_info: ip,
    //       product_id: product_id,
    //       start_time: new Date(),
    //       stop_time: new Date(),
    //     })
    //     .catch((err) => console.log(err));
    // }, 10000);
  };
  const handleMouseLeave = () => {
    setDot("hidden");
  };
  const handleMouseEntere = async () => {
    setDot("visible");
  };

  return (
    <>
      <figure
        style={{ width: "14rem", border: "1px solid #F0F0F0 " }}
        className="rounded-md bg-white mb-4"
        key={id}
        onMouseEnter={handleMouseEntere}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute bg-black bg-opacity-10  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20 z-10"
          style={{ visibility: dot }}
        >
          <DotsVerticalIcon className="h-5" onClick={()=>openModal(id)} />
        </div>
        <div
          className="absolute z-10 mt-8 bg-black bg-opacity-20 p-0.5 font-bold text-xs text-gray-200"
          style={{ visibility: dot }}
        >
          -20%
        </div>
        <LazyLoadImage
          src={image}
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
        <div className="p-2 flex flex-row items-center content-center">
          <div
            className="p-2 mr-2 bg-gray-400 rounded-full"
            style={{ width: "1.7rem", height: "1.7rem" }}
          ></div>
          <div>
            <Link className="text-black" to={`/product-detail/${id}`}>
              {product_name}
            </Link>

            <figcaption>
              <div className="font-semibold text-gray-600">Kshs {price} /=</div>
            </figcaption>
          </div>
        </div>
      </figure>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="p-4" onMouseEnter={() => handleMouseEnter(id)}>
          <div className="flex flex-row justify-between content-center items-center">
            <img
              src={image}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                paddingTop: "0",
              }}
              loading="lazy"
              className="rounded-md"
            />
            <div>
              <div className="text-lg font-semibold">{product_name}</div>
              <div className="text-gray-700 font-semibold">Kshs {price}/=</div>
              <div className="text-gray-400 text-sm line-through">
                Kshs {price}/=
              </div>
            </div>

            <div>
              <div
                style={{ textAlign: "center" }}
                className="text-gray-600 font-semibold text-lg"
              >
                Delivery details
              </div>
              <div className="flex flex-row space-x-2">
                <LocationMarkerIcon className="h-5 text-gray-300" />
                <div className="text-gray-500">Umoja, Egessa Villa</div>
              </div>
              <div className="flex flex-row space-x-2">
                <ClockIcon className="h-5 text-gray-300" />
                <div className="text-gray-500">5 mins</div>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ textAlign: "center" }}>description</h3>
            <div
              className="flex justify-center"
              style={{ height: 100, overflowY: "scroll", marginTop: 10 }}
            >
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
          <hr />
          <div className="justify-center content-center items-center flex flex-row">
            <div
              className="flex justify-around p-2 content-center space-x-2"
              style={{ width: "18rem" }}
            >
              <div
                style={{ backgroundColor: "#47817F" }}
                className="flex flex-row content-center items-center justify-center w-full p-0 rounded-md"
              >
                <CreditCardIcon className="h-10 text-white m-0 p-2" />
                <button className="p-1 text-gray-100 focus:outline-none">
                  Buy
                </button>
              </div>
              <div
                className="flex flex-row content-center items-center justify-center w-full p-0 rounded-md"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <ShoppingCartIcon className="h-10 p-2 text-gray-700" />
                <button className="text-gray-700">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
