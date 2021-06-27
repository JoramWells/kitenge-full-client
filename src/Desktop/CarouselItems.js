import React, { useState, memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import NumberFormat from "react-number-format";
import axios from "axios";
import moment from "moment";
import {
  ClockIcon,
  CreditCardIcon,
  DotsVerticalIcon,
  LocationMarkerIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import Modal from "./modalComponent/Modal";
import { useAvatar, useViews } from "../hooks/useViews";
import { Flex } from "../components/styles";
import useGeolocation from "../hooks/useGeolocation";

export function CarouselItem({ product }) {
  const location = useGeolocation();
  const { id, product_name, image, price, description, userId, updatedAt } =
    product;
  const [showModal, setShowModal] = useState(false);
  const views = useViews(id);
  const avatar = useAvatar(userId);

  const [ip, setIP] = useState("");

  const [dot, setDot] = useState("hidden");

  const openModal = async (product_id) => {
    setShowModal((prev) => !prev);
    if (location.loaded == true && location.coordinates) {
      await axios
        .post("/aidata", {
          ipAddr: ip,
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
          productId: product_id,
        })
        .catch((err) => console.log(err));
    }
  };

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
    console.log(location);
    getIP();
  }, [getIP]);
  const handleMouseLeave = () => {
    setDot("hidden");
  };
  const handleMouseEnter = async () => {
    setDot("visible");
  };

  return (
    <div
    // style={{zIndex:"-1"}}
    >
      <figure
        style={{ width: "15rem", border: "1px solid #F0F0F0 " }}
        className="rounded-md bg-white mb-8 shadow-md"
        key={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute z-0 bg-black bg-opacity-10  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20"
          style={{ visibility: dot }}
        >
          <DotsVerticalIcon className="h-5" onClick={() => openModal(id)} />
        </div>
        <div
          className="absolute mt-8 bg-black bg-opacity-20 p-0.5 font-bold text-xs text-gray-200"
          style={{ visibility: dot }}
        >
          -20%
        </div>
        <img
          src={image}
          // effect="blur"
          alt="productimage"
          style={{
            width: "15rem",
            height: "155px",
            display: "block",
            margin: "auto",
            zIndex: "0 !important",
          }}
          loading="eager"
        />
        <div className="p-2 flex flex-row  space-x-2">
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
              to={`/product-detail/${id}`}
            >
              {product_name}
            </Link>

            <figcaption>
              <div className="font-semibold text-gray-600">Kshs {price} /=</div>
            </figcaption>
            <div className="text-gray-400 text-xs flex flex-row space-x-2">
              <div>{views} views</div>
              <div>| {moment(updatedAt).fromNow("yyyy")}</div>
            </div>
          </div>
        </div>
      </figure>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="p-4">
          <Flex>
            <LazyLoadImage
              src={image}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                paddingTop: "0",
              }}
              // loading="lazy"
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
            <div
              style={{ width: "55%", margin: "auto" }}
              className="flex flex-row justify-center content-center "
            >
              <button className="w-full text-gray-100 focus:outline-none bg-black bg-opacity-80 m-1  flex flex-row items-center content-center justify-center rounded-md">
                <CreditCardIcon className="h-10 text-white p-2" />
                Buy
              </button>

              <button className="text-gray-700 flex flex-row w-full content-center m-1 items-center bg-gray-300 justify-center rounded-md">
                <ShoppingCartIcon className="h-10 p-2 text-gray-700" />
                Add to Cart
              </button>
            </div>
          </Flex>
        </div>
      </Modal>
    </div>
  );
}

export const CarouselItems = memo(CarouselItem);
