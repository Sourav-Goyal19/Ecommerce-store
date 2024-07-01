import { create } from "zustand";
import { ColorData, ProductData, SizeData } from "@/types";

export interface CartProduct {
  productId: string | ProductData;
  quantity: number;
  colorId: string | ColorData;
  sizeId: string | SizeData;
}

export interface CartData {
  _id: string;
  products: CartProduct[] | string[];
  customerId: string;
}

interface Cart {
  cart: CartData | undefined;
  setCart: (data: CartData) => void;
}

export const useCart = create<Cart>((set) => ({
  cart: undefined,
  setCart: (data) => set({ cart: data }),
}));
