import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import { RefreshIcon } from "@heroicons/react/outline";
import { listProducts } from "../_actions/productActions";
import { Skeleton, Flex, Container } from "../components/styles";
import Cookie from "js-cookie";

export const ProductContext = createContext();

const renderSkeleton = [...Array(10).keys()].map((i) => {
  return (
    <div style={{ maxWidth: "83%", float: "right", marginTop: "1rem", marginBottom:"1rem" }}>
      {/* Skeleton */}
      <div
        style={{ width: "15rem", backgroundColor: "white" }}
        className="pb-4"
      >
        <div className="image"></div>
        <div className="content">
          <div className="avatar"></div>
          <div className="w-full mt-4 space-y-2 p-2">
            <div className="item-name"></div>
            <div className="item-price"></div>
          </div>
        </div>
      </div>
    </div>
  );
});
function reloadHandler() {
  window.location.reload();
}
export function ProductProvider(props) {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const searchedItems = Cookie.getJSON("searchedITems");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);
  return (
    <>
      {loading ? (
        <Container>
          <Flex>{renderSkeleton}</Flex>
        </Container>
      ) : error ? (
        <Result
          status="500"
          subTitle={error}
          extra={
            <Flex>
              <Flex
                onClick={reloadHandler}
                className="hover:cursor-pointer space-x-4 ring-1 ring-gray-500 w-1/4"
              >
                <RefreshIcon className="h-5 font-extralight" />
                RETRY
              </Flex>
            </Flex>
          }
        />
      ) : (
        <ProductContext.Provider value={posts}>
          {props.children}
        </ProductContext.Provider>
      )}
    </>
  );
}
