import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col, Card, Result, Button } from "antd";
// import NumberFormat from "react-number-format";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Modal from "./modalComponent/Modal";

export function CarouselItem({ product }) {
  const { id, product_name, image, price } = product;
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <div
        key={id}
      >
        <figure
          style={{ width: "14rem", border: "1px solid #F0F0F0 " }}
          className="rounded-md bg-white"
        >
          <div className="absolute bg-white bg-opacity-30  text-white p-1 rounded-full flex justify-end flex-row items-end focus:bg-opacity-20 active:bg-opacity-20 z-10">
            <DotsVerticalIcon className="h-5" onClick={openModal} />
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
          <div className="p-2">
            {product_name}
            <figcaption>
              <div className="font-semibold text-gray-600">Kshs {price} /=</div>
              <div className="line-through text-sm text-gray-300">
                Kshs 4,321/=
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>{product_name}</div>
        <div>{price}</div>
      </Modal>
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
