import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
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
  Result,
  Card, Image
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  updateProduct,
} from "../_actions/productActions";
import {
  CaretRightOutlined,
  DeleteFilled,
  EditOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactMarkdown from 'react-markdown'

const renderTH = [...Array(4).keys()].map((i) => {
  return (
    <Fragment key={i}>
      <th>
        <Skeleton.Input style={{ width: "3.5rem", height: "1.5rem" }} />
      </th>
    </Fragment>
  );
});

const inputStyles = {
  borderTop: "0",
  borderLeft: "0",
  borderRight: "0",
};

const columns = [
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image src={"/" + img} alt="image file" style={{ width: "50px", height:"50px", objectFit:"contain" }} />
    ),
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];
export default function ManageProducts() {
  const ProductList = useSelector((state) => state.productList);
  const ProductUpdate = useSelector((state) => state.productUpdate);
  const { product, loadingUpdate, errorUpdate } = ProductUpdate;
  const { posts, loading, error } = ProductList;

  const ProductDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = ProductList;
  const renderTB = [...Array(4).keys()].map((i) => {
    return (
      <Fragment key={i}>
        <td>
          <Skeleton.Input style={{ width: "3.5rem", height: "1.5rem" }} />
        </td>
      </Fragment>
    );
  });

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const productEdit = useCallback(() => {
    dispatch(
      updateProduct(id, name, price, stock, shop, image, category, description)
    );
    setTimeout(() => {
      dispatch(listProducts());
      setIsModalVisible(false);
      if (product) message.success("Product update successfully");
    }, 1000);
  });
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
    setStock(item.stock);
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };
  function handleReload() {
    window.location.reload();
  }

  function handleOk() {
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
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
        setShowLoading(false);
      }
      if (info.file.status === "done") {
        setShowButton(false);
        const ext = info.file.name.slice(0, info.file.name.lastIndexOf("."));
        const filename = ext + ".webp";
        setImage(filename);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  return (
    <Fragment>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row justify="center">
          <Col style={{ width: "20rem" }}>
            <Form layout="vertical" name="basic" encType="multipart/form-data">
              <img
                src={"/" + image}
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
                  style={inputStyles}
                  value={name}
                  prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
                  placeholder="Fendi"
                />
                <input hidden type="text" />
              </Form.Item>
              <Form.Item
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              >
                <Input
                  style={inputStyles}
                  value={price}
                  prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
                />

                <input
                  hidden
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2999 /="
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
                  style={inputStyles}
                  value={shop}
                  placeholder="Shop name"
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
                  style={inputStyles}
                  value={category}
                  placeholder="Category"
                  prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
                />
                <input
                  hidden
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="stock"
                id="stock"
                onChange={(e) => setStock(e.target.value)}
              >
                <Input
                  style={inputStyles}
                  value={stock}
                  placeholder="Available stock"
                  prefix={<CaretRightOutlined style={{ color: "#fdba45" }} />}
                />
                <input
                  hidden
                  type="text"
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Item>
              <Card style={{ height: 150, overflowY: 'scroll', margin:".3rem" }}>
              <ReactMarkdown >
                
                {description}</ReactMarkdown>

              </Card>

              <Form.Item
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                <Input.TextArea rows={10} value={description} />
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
                      onClick={() => productEdit()}
                      style={{ backgroundColor: "#fdba45", border: "0" }}
                    >
                      COMPLETE
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
      <main>
        {loading ? (
          <Row justify="space-around" align="middle">
            <Col>
              <table style={{ marginTop: "5rem" }}>
                <thead>
                  <tr>{renderTH}</tr>
                </thead>
                <tbody>
                  <tr>{renderTB}</tr>
                  <tr>{renderTB}</tr>
                  <tr>{renderTB}</tr>
                </tbody>
              </table>
            </Col>
          </Row>
        ) : error ? (
          <Row
            style={{ marginTop: "5rem" }}
            justify="space-around"
            align="middle"
          >
            <Col>
              <Result
                status="500"
                subTitle={error}
                extra={
                  <Button icon={<ReloadOutlined />} onClick={handleReload}>
                    RETRY
                  </Button>
                }
              />
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

              <table className="tableClass" style={{ width: "100%" }}>
                <thead>
                  <th>name</th>
                  <th>price</th>
                  <th>image</th>
                  <th>action</th>
                </thead>
                <tbody>
                  {posts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td>{item.price}</td>
                      <td>
                        <img
                          src={"/" + item.image}
                          style={{ width: "50px", height: "auto" }}
                          alt={item.product_name}
                        />
                      </td>
                      <td>
                        <Row justify="space-around">
                          <Col>
                            <EditOutlined
                              style={{ color: "green" }}
                              onClick={() => showModal(item)}
                            />
                          </Col>
                          <Col>
                            <DeleteFilled
                              style={{ color: "rgba(207, 0, 15, 0.6)" }}
                              onClick={() => deleteHandler(item.id)}
                            />
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
      </main>
    </Fragment>
  );
}
