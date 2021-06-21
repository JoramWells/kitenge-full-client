import React, { useCallback, useState, memo } from "react";
import { Col, Card, message, Image, Divider } from "antd";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import axios from "axios";

// import { listProducts } from "../../_actions/productActions";
import { addToCart } from "../_actions/cartActions";
import {
  HeartIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
// import { likedItem } from "../_actions/likedActions";
// import ModalClass from "../Generic/ModalClass";



function CarouselIte({ products }) {
  const { id, product_name, image, price, like, src } = products;
  const history = useHistory();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // function showModal2() {
  //   setTimeout(() => {
  //     setVisible2(true);
  //   }, 500);
  // }

  // function showModal3() {
  //   setTimeout(() => {
  //     setVisible3(true);
  //   }, 500);
  // }

  // const showModal = useCallback((item) => {
  //   setTimeout(() => {
  //     setVisible(true);
  //   }, 500);

  //   setId(item.id);
  //   setImage(item.image);
  //   setDate(item.updatedAt);
  //   setName(item.product_name);
  //   setShop(item.shop);
  //   setPrice(item.price);
  //   setCategory(item.category);
  //   setDescription(item.description);
  //   setRate(item.ratings);
  // });

  // function handleCancel() {
  //   setTimeout(() => {
  //     setVisible(false);
  //     setVisible2(false);
  //   }, 1000);
  // }
  // function handleCancel2() {
  //   setTimeout(() => {
  //     setVisible2(false);
  //   }, 500);
  // }
  // function handleCancel3() {
  //   setTimeout(() => {
  //     setVisible3(false);
  //   }, 500);
  // }
  // function handleReload() {
  //   window.location.reload();
  // }

  // const likePost = async (id, likes) => {
  //   await axios.put(`product/likes/${id}`, { likes: likes });
  // };

  // function handleTap(id) {
  //   liked = !liked;
  //   setLiked(liked);
  //   console.log("You tapped me");
  //   const stateLiked = {
  //     username: userInfo.name,
  //     liked: liked,
  //     id: id,
  //   };

  //   // Cookie.set("likedCookie", JSON.stringify(stateLiked));
  //   // const ifLiked = Cookie.getJSON("likedCookie");
  //   // if (ifLiked.liked == true) {
  //   //   message.info("Product liked");
  //   // } else message.info("Product unliked");
  //   dispatch(likedItem(id));
  //   // console.log(liked);
  // }

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
      <div className="shadow-md">
        {/* <div className="absolute bg-yellow-500 px-2 bg-opacity-40 rounded-br-md font-bold text-gray-300">
        20
      </div> */}
        <div className="absolute mx-auto bg-black p-2 top-0 right-0 bg-opacity-20 rounded-bl-2xl z-5">
          <HeartIcon className="h-5 text-gray-200 active:text-red-400" />
        </div>
        <Image
          alt={src}
          src={image}
          style={{ width: "18rem", height: "12rem",zIndex:"-1" }}
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
          <div>
            <p className="text-gray-400 text-xs  m-0 line-through">
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
            <div className="flex flex-row">
              <ThumbUpIcon className="h-5" />
              {like}
            </div>
            <p className="m-0">Sold 93</p>
          </div>
        </div>
      </div>
    </Col>
  );
}

export const CarouselItem = memo(CarouselIte);
