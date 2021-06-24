import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../_actions/productActions";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { Form, Button, message, Upload } from "antd";
import { ChevronRightIcon } from "@heroicons/react/solid";
import styled from "styled-components";
import { Col, Card } from "../components/styles";

export default function AddProduct() {
  const history = useHistory();
  const priceRef = useRef();
  const nameRef = useRef();
  const sellingPriceRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const stockRef = useRef();
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const prop = {
    name: "file",
    listType: "picture",
    action: "/upload",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          e.preventDefault();
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = (e) => {
            e.preventDefault();
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve);
          };
        };
      });
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const ext = info.file.name.slice(0, info.file.name.lastIndexOf("."));
        const filename = ext + ".webp";
        setImage(filename);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  const productAdd = useCallback(
    (e) => {
      e.preventDefault();
      const name = nameRef.current.value;
      const price = priceRef.current.value;
      const selling_price = sellingPriceRef.current.value;
      const stock = stockRef.current.value;
      const category = categoryRef.current.value;
      const description = descriptionRef.current.value;

      dispatch(
        saveProduct(
          name,
          price,
          selling_price,
          stock,
          userInfo.id,
          image,
          category,
          description
        )
      );
      setTimeout(() => {
        message.success("Product added succefully");
        history.go("/produc/manage");
      }, 2000);
    },
    [dispatch, history, image, userInfo.id]
  );

  return (
    <Col>
      <Card className="rounded-md ring-1 ring-gray-300">
        <Form layout="vertical" encType="multipart/form-data">
          <div className="flex my-4 flex-row ring-1 ring-gray-300 p-2 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md ">
            <ChevronRightIcon className="h-5 text-gray-400 " />
            <input
              name="name"
              id="name"
              className="focus:outline-none "
              placeholder="Item name"
              ref={nameRef}
            />
          </div>
          <div className="flex my-4 flex-row ring-1 ring-gray-300 p-2 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
            <ChevronRightIcon className="h-5 text-gray-400 " />
            <input
              name="price"
              id="price"
              className="focus:outline-none "
              placeholder="Original price"
              ref={priceRef}
            />
          </div>

          <div className="flex my-4 flex-row ring-1 ring-gray-300 p-2 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
            <ChevronRightIcon className="h-5 text-gray-400 " />
            <input
              name="selling_price"
              id="selling_price"
              className="focus:outline-none "
              placeholder="Selling price"
              ref={sellingPriceRef}
            />
          </div>
          <div className="flex my-4 flex-row ring-1 ring-gray-300 p-2 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
            <ChevronRightIcon className="h-5 text-gray-400 " />
            <input
              name="category"
              id="category"
              className="focus:outline-none "
              placeholder="shoes, skirt, dress"
              ref={categoryRef}
            />
          </div>
          <div className="flex my-4 flex-row ring-1 ring-gray-300 p-2 items-center rounded-md text-gray-600 txt-sm cursor-pointer hover:shadow-md">
            <ChevronRightIcon className="h-5 text-gray-400 " />
            <input
              name="stock"
              id="stock"
              className="focus:outline-none "
              placeholder="Available stock"
              ref={stockRef}
              required
            />
          </div>

          <div
            className="flex flex-row w-full my-8"
            style={{ borderBottom: "1px solid whitesmoke" }}
          >
            <ChevronRightIcon className="h-5" />
            <textarea
              name="description"
              id="description"
              className="focus:outline-none "
              placeholder="Product description"
              ref={descriptionRef}
              cols={50}
              row={20}
              style={{
                border: "1px solid gray",
                padding: ".5rem",
                borderRadius: "5px",
              }}
            />
          </div>

          <Form.Item>
            <Upload {...prop}>
              <Button
                icon={
                  <UploadOutlined style={{ backgroundColor: "whitesmoke" }} />
                }
              >
                Select image
              </Button>
            </Upload>
          </Form.Item>

          <button
            className="w-full bg-black bg-opacity-80 rounded-md p-1.5 text-white"
            onClick={productAdd}
          >
            Add
          </button>
        </Form>
      </Card>
    </Col>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid whitesmoke;
`;
