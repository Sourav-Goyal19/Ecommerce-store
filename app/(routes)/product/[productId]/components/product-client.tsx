"use client";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { IndiviualProduct, ProductImageData } from "@/types";
import { useCart } from "@/zustand/cart";
import { useUser } from "@/zustand/user";
import React, { useState } from "react";

interface ProductClientProps {
  fetchedProduct: IndiviualProduct;
}

const ProductClient: React.FC<ProductClientProps> = ({ fetchedProduct }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const { user } = useUser();
  const { cart, setCart } = useCart();

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start overflow-hidden lg:gap-x-8">
      <Gallery
        productImage={
          fetchedProduct.product.productImages[activeIndex] as ProductImageData
        }
      />
      <div className="mt-10 sm:mt-16 lg:mt-0 sm:px-0 px-4">
        <Info
          data={fetchedProduct.product}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          user={user}
          setCart={setCart}
          activeSizeIndex={activeSizeIndex}
          setActiveSizeIndex={setActiveSizeIndex}
        />
      </div>
    </div>
  );
};

export default ProductClient;
