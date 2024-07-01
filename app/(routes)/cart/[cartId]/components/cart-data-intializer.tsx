"use client";

import { useEffect } from "react";
import { CartData } from "@/zustand/cart";
import { useCheckoutStore } from "@/zustand/checkoutStore";

type CartDataInitializerProps = {
  cartData: CartData;
};

const CartDataInitializer: React.FC<CartDataInitializerProps> = ({
  cartData,
}) => {
  const setCartData = useCheckoutStore((state) => state.setCartData);

  useEffect(() => {
    console.log(cartData);
    setCartData(cartData);
  }, [cartData, setCartData]);

  return null;
};

export default CartDataInitializer;
