import React from "react";

export default function RecentItemsBar(props) {
  return (
    <div
      style={{
        backgroundColor: "#dee3e3",
        padding: " 0.4rem 0 0.09rem 1rem ",
        width: "81%",
        display: "block",
        margin: "auto"

      }}
    >
        <h3 >{props.title}</h3>
    </div>
  );
}
