import React, { useEffect, useState, Fragment } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Row,
  Col,
  message,
  Skeleton,
  Empty,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  updateProduct,
} from "../_actions/productActions";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";

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
  const [showButton, setShowButton] = useState(true);
  const [showLoading, setShowLoading] = useState(false);


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
        setShowLoading(false)


      }
      if (info.file.status === "done") {
        setShowButton(false)
        const regex = /.jpeg/;
        // var mapObjs = {
        //   svg
        // }
        const filename = info.file.name.replace(regex, ".webp");
        setImage("/" + filename);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  return (
    <Fragment>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          layout="vertical"
          name="basic"
          encType="multipart/form-data"
          size="large"
        >
          <img
            src={image}
            style={{ width: "70px", marginBottom: ".3rem" }}
            alt={name}
          />
          <Form.Item
            required
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          >
            <Input
              value={name}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input hidden type="text" />
          </Form.Item>
          <Form.Item
            name="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input
              value={price}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />

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
            name="shop"
            onChange={(e) => setShop(e.target.value)}
          >
            <Input
              value={shop}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input
              hidden
              type="text"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <Input
              value={category}
              prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
            />
            <input
              hidden
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input.TextArea value={description} />
            <input
              hidden
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Row justify="space-around" align="middle">
            <Col>
              <Form.Item>
                <Upload {...prop}>
                  <Button icon={<UploadOutlined />}>UPLOAD IMAGE</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                loading={showLoading}
                  disabled={showButton}
                  htmlType="submit"
                  type="primary"
                  onClick={productEdit}
                  style={{ backgroundColor: "#fdba45", border: "0" }}
                >
                  COMPLETE
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {loading ? (
        <table style={{ marginTop: "5rem" }}>
          <thead>
            <th>
              <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
            </th>
            <th>
              <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
            </th>
            <th>
              <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
            </th>
            <th>
              <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
            <tr>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>{" "}
              <td>
                <Skeleton.Input style={{ width: "4.5rem", height: "1.5rem" }} />
              </td>
            </tr>
          </tbody>
        </table>
      ) : error ? (
        <Row
          style={{ marginTop: "5rem" }}
          justify="space-around"
          align="middle"
        >
          <Col>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={error}
            ></Empty>
          </Col>
        </Row>
      ) : (
        // <Table dataSource={posts} columns={columns}/>
        <Row
          style={{ marginTop: "3rem", marginBottom: "3rem" }}
          justify="space-around"
          align="middle"
        >
          <Col>
            <table className="tableClass">
              <thead>
                <th>id</th>
                <th>name</th>
                <th>price</th>
                <th>image</th>
                <th>action</th>
              </thead>
              <tbody>
                {posts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={item.image}
                        style={{ width: "100px" }}
                        alt={item.product_name}
                      />
                    </td>
                    <td>
                      <Row justify="space-around">
                        <Col>
                          <Button onClick={() => showModal(item)}>Edit</Button>
                        </Col>
                        <Col>
                          <Button onClick={() => deleteHandler(item.id)}>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
