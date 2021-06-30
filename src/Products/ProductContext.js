import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import { RefreshIcon } from "@heroicons/react/outline";
import { listProducts } from "../_actions/productActions";
import { Skeleton, Flex } from "../components/styles";
import Cookie from 'js-cookie'

export const ProductContext = createContext();

const renderSkeleton = [...Array(8).keys()].map((i) => {
  return <Skeleton key={i} className="mb-4 p-2"></Skeleton>;
});
function reloadHandler() {
  window.location.reload();
}
export function ProductProvider(props) {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const searchedItems = Cookie.getJSON("searchedITems")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {};
  }, []);
  return (
    <>
      {loading ? (
        <Flex>{renderSkeleton}</Flex>
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
