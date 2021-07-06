import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";

export default function Scrollable() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


  const fetchData = useCallback(()=>{
      setPage(page+1)
      dispatch(listProducts(page))
  },[])
  useEffect(() => {
    dispatch(listProducts(page));
    return () => {};
  }, [dispatch]);

  const onScroll = () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable === Math.ceil(window.scrollY)) {
      //   console.log("pussy");
      setPage(page + 1);

      //
    }
    // break
    // console.log(page)
    // dispatch(listProducts(page));
  };
//   window.addEventListener("scroll", onScroll);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <InfiniteScroll
          dataLength={24}
          next={() => dispatch(listProducts(page+1))}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>}
        >
          {posts.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt="wtf" />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
