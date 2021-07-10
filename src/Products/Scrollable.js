import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../_actions/productActions";
import axios from "axios";

export default function Scrollable() {
  const ProductList = useSelector((state) => state.productList);
  const { posts, loadi, erro } = ProductList;
  const [products, setProducts] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // const fetchData = useCallback(()=>{
  //     setPage(page+1)
  //     dispatch(listProducts(page))
  // },[])
  async function fetchData() {
    setPage(page + 1);
    setLoading(true);
    await axios
      .get(`/products?page=${page}&size=8`)
      .then((response) => {
        setProducts([...products, ...response.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }

  useEffect(async () => {
    fetchData();

    return () => {};
  }, []);


  return (
    <>
      {products && (
        <InfiniteScroll
          dataLength="31"
          next={() => fetchData()}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt="wtf" />
            </div>
          ))}
        </InfiniteScroll>
      )}
      {/* {loading ? (
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
      )} */}
    </>
  );
}
