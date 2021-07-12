import React, { useState, memo, useRef } from "react";
import { Link } from "react-router-dom";
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
import { useAvatar, useIp, useViews } from "../hooks/useViews";
import { Flex } from "../components/styles";
import Btn from "../buttonComponent/Button";
import { Figure } from "../components/styles";
// import useGeolocation from "../hooks/useGeolocation";

export function CarouselItem({ product }) {
  // const location = useGeolocation();
  const {
    id,
    product_name,
    image,
    price,
    category,
    description,
    userId,
    updatedAt,
  } = product;
  const [showModal, setShowModal] = useState(false);
  const views = useViews(id);
  const ip = useIp();
  const avatar = useAvatar(userId);
  const [dot, setDot] = useState("hidden");

  const openModal = async (product_id) => {
    setShowModal((prev) => !prev);
    // if (location.loaded == true && location.coordinates) {
    await axios
      .post("/aidata", {
        ipAddr: ip,
        productId: product_id,
      })
      .catch((err) => console.log(err));
    // }
  };

  const handleMouseLeave = () => {
    setDot("hidden");
  };
  const handleMouseEnter = async () => {
    setDot("visible");
  };
  const handleClick = (e) => {
    e.preventDefault();
    alert("wtf");
  };
  const scrollRef = useRef();

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  return (
    <>
      <Figure
        className=" mb-8 ring-1 ring-gray-200"
        key={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={scrollRef}
      >
        <div
          className="absolute z-1 bg-black bg-opacity-10  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20"
          style={{ visibility: dot }}
        >
          <DotsVerticalIcon className="h-5" onClick={() => openModal(id)} />
        </div>
        <div
          className="absolute mt-8 bg-black bg-opacity-50 p-0.5 font-bold text-xs text-gray-200"
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
            height: "160px",
            display: "block",
            margin: "auto",
            zIndex: "0 !important",
          }}
          loading="eager"
        />
        <div className="p-2 flex flex-row  space-x-2 items-center">
          <img
            loading="lazy"
            effect="blur"
            src={avatar}
            alt=""
            className="rounded-full"
            style={{ width: "30px", height: "30px" }}
          />

          <div>
            <blockquote>
              <Link
                className="text-gray-800 font-bold"
                to={`/product-detail/${id}/?category=${category}`}
              >
                {product_name}
              </Link>
            </blockquote>

            <figcaption>
              <div className="font-semibold text-gray-600">Kshs {price} /=</div>
            </figcaption>
            <div className="text-gray-400 text-xs flex flex-row space-x-2">
              <div>{views} views</div>
              <div>| {moment(updatedAt).fromNow("yyyy")}</div>
            </div>
          </div>
        </div>
      </Figure>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Flex>
          <div>
            <img
              src={image}
              alt=""
              style={{
                width: "370px",
                height: "272px",
                // objectFit: "contain",
              }}
              loading="lazy"
              // className="rounded-md"
            />
          </div>
          <div className="p-2 flex-1 bg-white">
            <h1 className="text-lg font-bold text-gray-700 m-0 p-0">
              {product_name}
            </h1>
            <h2 className="m-0 p-0 font-semibold text-gray-500">
            Selling Price:  Kshs {price}/=
            </h2>
            <p className="m-0 p-0  text-gray-400 line-through text-xs">
            Orgn. Price: Kshs {price}/=
            </p>
            <div className="text-xs text-gray-400">
              {views} view(s) | {moment(updatedAt).fromNow("yyyy")}
            </div>
            <hr className="my-1" />
            <div>
              <div className="text-gray-600 font-semibold text-lg">
                Delivery details
              </div>
              <div className="flex flex-row space-x-1">
                <LocationMarkerIcon className="h-5 text-gray-300" />
                <div className="text-gray-500">Free within: Umoja, Egessa Villa</div>
              </div>
              <div className="flex flex-row space-x-1">
                <ClockIcon className="h-5 text-gray-300" />
                <div className="text-gray-500">Time-out: 5 mins</div>
              </div>
            </div>
            <hr className="my-1" />
            <div
              style={{ height: 90, overflowY: "scroll", marginTop: 2 }}
              className="text-gray-500"
            >
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

          </div>
          <hr className="my-1" />
            <div
              style={{ width: "55%", margin: "auto", backgroundColor:"transparent" }}
              className="flex flex-column justify-center content-center space-x-2 p-1"
            >
              <Btn
                Icon={CreditCardIcon}
                text="Buy"
                onClick={handleClick}
                buttonStyle="btn-primary-solid"
              />
              <Btn Icon={ShoppingCartIcon} text="Cart" onClick={handleClick} />
            </div>
        </Flex>
      </Modal>
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
