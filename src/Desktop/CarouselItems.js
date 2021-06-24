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
import { useViews } from "../hooks/useViews";
import { Flex } from "../components/styles";

export function CarouselItem({ product }) {
  const { id, product_name, image, price, description, userId } = product;
  const [showModal, setShowModal] = useState(false);
  const views = useViews(id);

  const [ip, setIP] = useState("");

  const [dot, setDot] = useState("hidden");
  async function openModal(product_id) {
    setShowModal((prev) => !prev);
    await axios
      .post("/aidata", {
        ipAddr: ip,
        productId: product_id,
      })
      .catch((err) => console.log(err));
  }
  const getIP = useCallback(async () => {
    try {
      await axios
        .get("https://api.ipify.org/")
        .then((res) => setIP(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getIP();
  }, [getIP]);
  const handleMouseLeave = () => {
    setDot("hidden");
  };
  const handleMouseEnter = async () => {
    setDot("visible");
  };

  return (
    <>
      <figure
        style={{ width: "14rem", border: "1px solid #F0F0F0 " }}
        className="rounded-md bg-white mb-4"
        key={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute bg-black bg-opacity-10  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20 z-10"
          style={{ visibility: dot }}
        >
          <DotsVerticalIcon className="h-5" onClick={() => openModal(id)} />
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
            height: "145px",
            display: "block",
            margin: "auto",
          }}
          className="rounded-t-sm -z-10"
        />
        <div className="p-2 flex flex-row items-center content-center">
          <div>
            <Link className="text-black" to={`/product-detail/${id}`}>
              {product_name}
            </Link>

            <figcaption>
              <div className="font-semibold text-gray-600">Kshs {price} /=</div>
            </figcaption>
            <div className="text-gray-400 text-xs">{views} views</div>
          </div>
        </div>
      </figure>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="p-4">
          <Flex>
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
          </Flex>
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
            <Flex>
              <button className="w-full text-gray-100 focus:outline-none bg-red-400 flex flex-row items-center content-center rounded-md">
                <CreditCardIcon className="h-10 text-white p-2" />
                Buy
              </button>

              <button className="text-gray-700 flex flex-row w-full content-center items-center bg-gray-300 rounded-md">
                <ShoppingCartIcon className="h-10 p-2 text-gray-700" />
                Add to Cart
              </button>
            </Flex>
          </div>
      </Modal>
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
