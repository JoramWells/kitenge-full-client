import React from "react";
import DesktopMobile from "./DesktopMobile";
import DesktopNavbarMobile from "./DesktopNavbarMobile";
import { ProductProvider } from "./Products/ProductContext";

export default function HomeRoutes() {
  return (
    <ProductProvider>
      <DesktopNavbarMobile />
      <DesktopMobile />
    </ProductProvider>
  );
}
