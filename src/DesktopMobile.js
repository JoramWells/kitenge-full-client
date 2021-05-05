import React from "react";
import CarouselItem from "./Mobile/CarouselItem"
import {CarouselItems} from "./Desktop/CarouselItems"



export default function DesktopMobile() {
  return (
    <>
      <div className="mobile__carousel">
        <CarouselItem  />
      </div>
      <div className="desktop__carousel">
        <CarouselItems />
      </div>
    </>
  );
}
