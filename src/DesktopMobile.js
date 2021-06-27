import React, { useCallback, useEffect } from "react";
import { CarouselItem } from "./Mobile/CarouselItem";
import { CarouselItems } from "./Desktop/CarouselItems";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import { listProducts } from "./_actions/productActions";
import { RefreshIcon } from "@heroicons/react/outline";
import { Flex, Container, Skeleton } from "./components/styles";

const renderSkeleton = [...Array(8).keys()].map((i) => {
  return <Skeleton key={i} className="mb-4 p-2"></Skeleton>;
});
function reloadHandler() {
  window.location.reload();
}
export default function DesktopMobile() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const dispatch = useDispatch();
  const listItem = useCallback(() => {
    dispatch(listProducts());
  }, [dispatch]);
  useEffect(() => {
    listItem();
    return () => {};
  }, [listItem]);

  return (
    <>
      <div className="mobile__carousel" style={{ marginTop: "5rem" }}>
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
          <Flex>
            {posts.map((item) => (
              <CarouselItem key={item.id} products={item} />
            ))}
          </Flex>
        )}
      </div>
      <div className="desktop__carousel" style={{ zIndex:"-1 !important", overflow:"hidden" }}>
        {loading ? (
          <Container>
            <Flex>{renderSkeleton}</Flex>
          </Container>
        ) : error ? (
          <div className="flex justify-center flex-row mt-8">
            <Result
              status="500"
              subTitle={error}
              extra={
                <div className="flex flex-row justify-center content-center">
                  <div
                    onClick={reloadHandler}
                    className="flex flex-row hover:cursor-pointer justify-center content-center space-x-4 ring-1 ring-gray-500 w-1/4"
                  >
                    <RefreshIcon className="h-5 font-extralight" />
                    RETRY
                  </div>
                </div>
              }
            />
          </div>
        ) : (
          <Container>
            <Flex style={{zIndex:"-1"}}>
              {posts.map((product) => (
                <CarouselItems key={product.id} product={product} />
              ))}
            </Flex>
          </Container>
        )}
      </div>
    </>
  );
}
