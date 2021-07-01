import React, { useContext } from "react";
import CarouselItem  from "./Mobile/CarouselItem";
import { CarouselItems } from "./Desktop/CarouselItems";
import { Flex, Container, FlexDiv } from "./components/styles";
import { ProductContext } from "./Products/ProductContext";

export default function DesktopMobile() {
  const products = useContext(ProductContext);
  return (
    <>
      <div className="mobile__carousel" style={{ marginTop: "1rem" }}>
        <Flex>
          {products.rows.map((item) => (
            <CarouselItem key={item.id} products={item} />
          ))}
        </Flex>
      </div>

      <Container
        className="desktop__carousel"
        style={{overflow: "hidden" }}
      >
        <FlexDiv>
          
          {products.rows.map((product) => (
            <CarouselItems key={product.id} product={product} />
          ))}
        </FlexDiv>
      </Container>
    </>
  );
}
