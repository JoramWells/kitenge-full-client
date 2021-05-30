import React from "react";

export default function RecentItemsBar(props) {
  return (
    <div className="mt-8">
      <div
        className=" bg-gray-300 max-w-5xl pt-1 px-3 pb-1 hover:bg-gray-200 hover:shadow-md rounded-sm"
        style={{ margin: "auto", display: "block" }}
      >
        <p className="text-gray-600  mb-1 text-lg   font-semibold">
          {props.title}
        </p>
      </div>
    </div>
  );
}
