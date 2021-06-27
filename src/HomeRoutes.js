import React from "react";
import DesktopMobile from "./DesktopMobile"
import {ProductProvider} from './Products/ProductContext'


export default function HomeRoutes() {
  return (
    <ProductProvider>      

      <DesktopMobile />      

    </ProductProvider>
  );
}
