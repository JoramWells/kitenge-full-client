import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { Button, Upload, message, Skeleton, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  listProducts,
  updateProduct,
  userProducts,
} from "../_actions/productActions";
import Modal from "../Desktop/modalComponent/Modal";
import { DeleteFilled, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { ChevronRightIcon, RefreshIcon } from "@heroicons/react/solid";
import { Flex, Row, InputDiv, ColDiv } from "../components/styles";
import { PlusIcon,EmojiSadIcon } from "@heroicons/react/outline";

const renderTH = [...Array(4).keys()].map((i) => {
  return (
    <Fragment key={i}>
      <th>
        <Skeleton.Input style={{ width: "3.5rem", height: "1.5rem" }} />
      </th>
    </Fragment>
  );
});
function reloadHandler() {
  window.location.reload();
}
export default function ManageProducts(props) {
  const ProductList = useSelector((state) => state.productList);
  const UserProducts = useSelector((state) => state.myProducts);
  const { loadingProducts, items, errorProducts } = UserProducts;
  const ProductUpdate = useSelector((state) => state.productUpdate);
  const { product } = ProductUpdate;
  const { posts, loading, error } = ProductList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  // const ProductDelete = useSelector((state) => state.productDelete);
  // const {
  //   loading: loadingSave,
  //   success: successSave,
  //   error: errorSave,
  // } = ProductList;
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
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const mountedRef = useRef(true);
  useEffect(() => {
    // dispatch(listProducts());
    dispatch(userProducts(userInfo.id));
    if (items != null) console.log(items);
    return () => {
      mountedRef.current = false;
    };
  }, [dispatch]);

  const productEdit = useCallback(() => {
    dispatch(
      updateProduct(id, name, price, stock, shop, image, category, description)
    );
    setTimeout(() => {
      dispatch(listProducts());
      setShowModal(false);
      if (product) message.success("Product update successfully");
    }, 1000);
  }, [
    dispatch,
    id,
    name,
    price,
    stock,
    shop,
    image,
    category,
    description,
    product,
  ]);
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

  const showModa = (item) => {
    setShowModal(true);
    setId(item.id);
    setImage(item.image);
    setStock(item.stock);
    setName(item.product_name);
    setShop(item.shop);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description);
  };

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
      <nav className="desktop__manage">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div className="desktop__right">
          <div className="desktop__item">
            <PlusIcon className="h-5" />
            <Link to="/products/add" className="text-gray-500">
              Add
            </Link>
          </div>
          <div className="desktop__item">
            <EmojiSadIcon className="h-5"  />
            Edit</div>
          <div className="desktop__item">A/c</div>
        </div>
      </nav>
      <main>
        {loadingProducts ? (
          <ColDiv>
            <div>
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
            </div>
          </ColDiv>
        ) : errorProducts ? (
          <ColDiv>
            <Result
              status="500"
              subTitle={errorProducts}
              extra={
                <Flex>
                  <Flex
                    onClick={reloadHandler}
                    className="hover:cursor-pointer space-x-4 ring-1 ring-gray-500 "
                    style={{ width: "5rem" }}
                  >
                    <RefreshIcon className="h-5 font-extralight" />
                    RETRY
                  </Flex>
                </Flex>
              }
            />
          </ColDiv>
        ) : (
          // <Table dataSource={posts} columns={columns}/>
          <ColDiv
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
            justify="space-around"
            align="middle"
          >
            <ColDiv>
              <table className="tableClass" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <td>name</td>
                    <td>price</td>
                    <td>image</td>
                    <td>action</td>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
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
                        <Row>
                          <ColDiv>
                            <EditOutlined
                              style={{ color: "green" }}
                              onClick={() => showModa(item)}
                            />
                          </ColDiv>
                          <ColDiv>
                            <DeleteFilled
                              style={{ color: "rgba(207, 0, 15, 0.6)" }}
                              onClick={() => deleteHandler(item.id)}
                            />
                          </ColDiv>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ColDiv>
          </ColDiv>
        )}
      </main>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Row>
          <div style={{ width: "20rem", padding: "1rem" }}>
            <form encType="multipart/form-data">
              <img
                src={"/" + image}
                style={{ width: "70px", marginBottom: ".3rem" }}
                alt={name}
              />
              <InputDiv>
                <ChevronRightIcon className="h-5 text-gray-400 " />
                <input
                  name="name"
                  id="name"
                  className="focus:outline-none "
                  placeholder="Item name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <ChevronRightIcon className="h-5 text-gray-400 " />
                <input
                  name="price"
                  id="price"
                  className="focus:outline-none "
                  placeholder="Available stock"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputDiv>

              <input
                name="image"
                hidden
                id="image"
                className="focus:outline-none "
                placeholder="Available stock"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <InputDiv>
                <ChevronRightIcon className="h-5 text-gray-400 " />
                <input
                  name="shop"
                  id="shop"
                  className="focus:outline-none "
                  placeholder="shop"
                  value={shop}
                  onChange={(e) => setShop(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <ChevronRightIcon className="h-5 text-gray-400 " />
                <input
                  name="category"
                  id="category"
                  className="focus:outline-none "
                  placeholder="Shoes skirts"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <ChevronRightIcon className="h-5 text-gray-400 " />
                <input
                  name="stock"
                  id="stock"
                  className="focus:outline-none "
                  placeholder="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </InputDiv>
              <div
                className="flex flex-row w-full my-8"
                style={{ borderBottom: "1px solid whitesmoke" }}
              >
                <textarea
                  name="description"
                  id="description"
                  className="focus:outline-none "
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols={50}
                  row={0}
                  style={{
                    border: "1px solid gray",
                    padding: ".5rem",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <Row>
                <Upload {...prop}>
                  <Button icon={<UploadOutlined />}>UPLOAD IMAGE</Button>
                </Upload>
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
              </Row>
            </form>
          </div>
        </Row>
      </Modal>
    </Fragment>
  );
}
