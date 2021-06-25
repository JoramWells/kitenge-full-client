import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function SearchedItems() {
  const SearchedItems = useSelector((state) => state.searchQuery);
  const { searchQuery, loadingSearch, errorSearch } = SearchedItems;
  console.log(searchQuery);
  return (
    <>
      {loadingSearch ? (
        <div>Loading...</div>
      ) : errorSearch ? (
        <div>{errorSearch}</div>
      ) : (
        <div className="flex flex-row">
          <div style={{ paddingTop: "5rem", width: "85%" }}>
            {searchQuery.map((item) => (
              <div className="flex flex-row justify-center items-center space-x-4">
                <img
                  src={item.image}
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                  }}
                />
                <div className="flex flex-col bg-white">
                  <div className="text-gray-800 font-bold text-xl">
                    {item.productName}
                  </div>
                  <div className="text-gray-700 text-lg">
                    Annies` Online Mall
                  </div>
                  <div className="text-gray-600">{item.description}</div>
                  <div
                    className="bg-red-600 rounded-md text-gray-50 px-2 text-sm"
                    style={{ width: "3rem" }}
                  >
                    SOLD
                  </div>
                  <div className="text-gray-400">
                    {moment(item.creted_on).format("yyyy dd")} | 9 views
                  </div>
                  <div className="flex flex-row space-x-4">
                    <button className="bg-black bg-opacity-80 px-3 py-1 rounded-md text-white ">Buy</button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded-md">Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: "5rem" }}>Related items</div>
        </div>
      )}
    </>
  );
}
