import React, {  useState, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import NumberFormat from "react-number-format";
import {
  ClockIcon,
  DotsVerticalIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import Modal from "./modalComponent/Modal";

export function CarouselItem({ product }) {
  const { id, product_name, image, price,description } = product;
  const [showModal, setShowModal] = useState(false);
  function openModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <div key={id}>
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
        <div className="p-2">
          <div className="flex flex-row justify-between content-center items-center">
            <img
              src={image}
              alt=""
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                paddingTop: "0",
                borderRadius: "10px",
              }}
              loading="lazy"
            />
            <div>
                <div className="text-lg font-semibold">{product_name}</div>
              <div className="text-gray-700 font-semibold">Kshs {price}/=</div>
              <div className="text-gray-400 text-sm line-through">Kshs {price}/=</div>

            </div>

            <div>
              <div
                style={{ textAlign: "center" }}
                className="text-gray-600 font-semibold text-lg"
              >
                Delivery details
              </div>
              <div className="flex flex-row">
                <LocationMarkerIcon className="h-5 text-gray-300" />
                <div>Umoja, Egessa Villa</div>
              </div>
              <div className="flex flex-row">
                <ClockIcon className="h-5 text-gray-300" />
                <div className="text-gray-500">5 mins</div>
              </div>
            </div>
          </div>
          <div>
          <h3 style={{textAlign:"center"}}>description</h3>
          <div className="flex justify-center" style={{ height: 100, overflowY: 'scroll', marginTop: 10 }}>
          <div dangerouslySetInnerHTML={{ __html: description }}/>
          </div>

          </div>
          <hr />
          <div className="flex justify-around p-2 content-center space-x-2">
            <button
              style={{ backgroundColor: "#47817F" }}
              className=" w-full rounded-md p-2 text-gray-100"
            >
              buy
            </button>
            <button
              className="w-full p-2 rounded-md text-gray-700"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            >
              add to cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const CarouselItems = memo(CarouselItem);
