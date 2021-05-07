import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { saveProduct } from "../_actions/productActions";
import {
  CaretRightOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import {
  Row,
  Form,
  Input,
  Button,
  message,
  Upload,
  Card,
  Col,
} from "antd";

const iconStyles = {
  color: "#fdba45",
};
const inputStyles = {
  borderTop: "0",
  borderLeft: "0",
  borderRight: "0",
};

export default function AddProduct(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState("");
  const [stock, setStock] = useState("");


  const dispatch = useDispatch();
  function closeHandler() {
    return history.goBack();
  }
  const prop = {
    name: "file",
    listType: "picture",
    action: "/upload",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
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
        // const regex = /.jpeg/
        // var mapObjs = {
        //   svg
        // }
        // const filename = info.file.name.replace(regex, '.webp')
        // setImage("/" + filename);
        setImage(info.file.name);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  const productAdd = useCallback((e) => {
    e.preventDefault();
    dispatch(saveProduct(name, price, stock, shop, image, ratings, category, description));
    setTimeout(() => {
      message.success("Product added succefully");
      history.go("/produc/manage");
    }, 2000);
  });

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ marginTop: "4rem", marginBottom: "3rem" }}
    >
      <Card style={{ width: "25rem" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <p style={{ fontSize: "1.1rem", margin: "0" }}>ADD PRODUCT</p>
          </Col>
          <Col>
            <CloseCircleOutlined
              className="close"
              style={{ fontSize: "1.5rem" }}
              onClick={closeHandler}
            />
          </Col>
        </Row>

        <Form layout="vertical"  encType="multipart/form-data">
          <Form.Item
            required
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="Item name"
            />
          </Form.Item>
          <Form.Item
            name="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="Enter price e.g 2030"
            />
          </Form.Item>
          <Form.Item
            id="shop"
            name="shop"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="Shop name"
            />
          </Form.Item>

          <Form.Item
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="shoes, shirt, kitchen"
            />
          </Form.Item>
          <Form.Item
            name="ratings"
            id="ratings"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="Ratings 4.3"
            />
          </Form.Item>
          <Form.Item
            name="stock"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          >
            <Input
              prefix={<CaretRightOutlined style={iconStyles} />}
              style={inputStyles}
              placeholder="Add stock"
            />
          </Form.Item>
          <Form.Item
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
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

          <Form.Item>
            <Button block htmlType="submit" type="primary" onClick={productAdd}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}
