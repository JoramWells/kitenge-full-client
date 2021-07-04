import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import { RefreshIcon } from "@heroicons/react/outline";
import { listProducts } from "../_actions/productActions";
import {Flex, Container } from "../components/styles";
import Cookie from "js-cookie";

export const ProductContext = createContext();

const renderSkeleton = [...Array(10).keys()].map((i) => {
  return (
    <div className="sizing">
      {/* Skeleton */}
      <div className="body">
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
  const [page, setPage] = useState(1)
  const searchedItems = Cookie.getJSON("searchedITems");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({page}));
    return () => {};
  }, []);
  
  const onScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    if(scrollable == Math.ceil(window.scrollY)){console.log("pussy")
    // dispatch(listProducts(page+1))
  }
  console.log(scrollable)
  console.log(window.scrollY)

  };
  window.addEventListener('scroll',onScroll)

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
