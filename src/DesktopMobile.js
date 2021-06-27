import React, {  useContext } from "react";
import { CarouselItem } from "./Mobile/CarouselItem";
import { CarouselItems } from "./Desktop/CarouselItems";
import { Flex, Container} from "./components/styles";
import { ProductContext } from "./Products/ProductContext";


export default function DesktopMobile() {
  const products = useContext(ProductContext);
  return (
    <>
      <div className="mobile__carousel" style={{ marginTop: "5rem", zIndex:"-1" }}>
        <Flex>
          {products.map((item) => (
            <CarouselItem key={item.id} products={item} />
          ))}
        </Flex>
      </div>
      <div
        className="desktop__carousel"
        style={{ zIndex: "-1 !important", overflow: "hidden" }}
      >
        <Container>
          <Flex style={{ zIndex: "-1" }}>
            {products.map((product) => (
              <CarouselItems key={product.id} product={product} />
            ))}
          </Flex>
        </Container>
      </div>
    </>
  );
}
