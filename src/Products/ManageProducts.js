import React, { useEffect, useState } from "react";
import {  Button, Modal, Input, Form, Upload,Row,Col, message} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  updateProduct,
} from "../_actions/productActions";
import {  UploadOutlined } from "@ant-design/icons";


export default function ManageProducts() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;

  const ProductDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = ProductList;

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const productEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(id, name, shop, price, image, category, description)
    );
  };
  const deleteHandler = () => {
    dispatch(deleteProduct(id));
  };

  // const productAdd = (e) => {
  //   e.preventDefault();
  //   dispatch(saveProduct(name, shop, price, image, category, description));
  //   message.success("Product added succefully");
  //   setTimeout(() => {
  //     props.history.push("/product/manage");
  //   }, 2000);
  // };

  const showModal = (item) => {
    setIsModalVisible(true);
    setId(item.id);
    setImage(item.image);

    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const columns = [
  //   {
  //     title: "id ",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "product_name",
  //     dataIndex: "product_name",
  //     key: "product_name",
  //   },
  //   {
  //     title: "price",
  //     dataIndex: "price",
  //     key: "price",
  //   },
  //   {
  //     title: "category",
  //     dataIndex: "category",
  //     key: "category",
  //   },
  //   {
  //     title: "image",
  //     dataIndex: "image",
  //     key: "image",
  //     render: (img) => (
  //       <Image src={img} alt="image file" style={{ width: "50px" }} />
  //     ),
  //   },
  //   {
  //     title: 'Action',
  //     dataIndex: 'operation',
  //     key: 'operation',
  //     render: () => (
  //       <Space size="middle">

  //             <Button onClick={() => showModal(...posts)}>Edit</Button>

  //         <Button>Delete</Button>
  
  
  //       </Space>
  //     ),
  //   },
  // ];

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
        // dispatch(saveProduct(name, shop, price, image, description));
      }
      if (info.file.status === "done") {
        const regex = /.jpeg/
        // var mapObjs = {
        //   svg
        // }
        const filename = info.file.name.replace(regex, '.webp')
        setImage("/" + filename);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        // <Table dataSource={posts} columns={columns}/>
        <Row justify="space-around" align="middle">
          <Col>
            <table>
              <thead>
                <th>id</th>
                <th>name</th>
                <th>price</th>
                <th>category</th>
                <th>image</th>
                <th>action</th>
              </thead>
              <tbody>
                {posts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <img
                        src={item.image}
                        style={{ width: "100px" }}
                        alt="dosjfljdsfdj"
                      />
                    </td>
                    <td>
                      <Button onClick={() => showModal(item)}>Edit</Button>
                      <Button onClick={() => deleteHandler(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      )}
      <Modal
        title="Edit products"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" name="basic" encType="multipart/form-data">
          <img src={image} width="100px" alt="djkflsjf" />
          <Form.Item
            required
            id="name"
            label="Item name"
            name="name"
            // rules={[{ message: "Enter item name", value: 1 }]}
            onChange={(e) => setName(e.target.value)}
          >
            <Input value={name} />
            <input hidden type="text" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input value={price} />

            <input
              hidden
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            hidden
            name="image"
            label="image"
            name="image"
            onChange={(e) => setImage(e.target.value)}
          >
            <Input value={image} />

            <input
              hidden
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            id="shop"
            label="Online shop"
            name="shop"
            onChange={(e) => setShop(e.target.value)}
          >
            <Input value={shop} />
            <input
              hidden
              type="text"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            rules={[{ message: "Enter image" }]}
          >
            <Input value={category} />
            <input
              hidden
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            id="description"
            value={description}
            rules={[{ message: "Enter description" }]}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input.TextArea value={description} />
            <input
              hidden
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Upload {...prop}>
              <Button icon={<UploadOutlined />}>Upload Item</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" onClick={productEdit}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
