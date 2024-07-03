import { CartData } from "./zustand/cart";

export interface BillboardData {
  _id: string;
  name: string;
  imageUrl: string;
}

export interface Billboard {
  message: string;
  billboard: BillboardData;
}

export interface CategoryData {
  _id: string;
  name: string;
  billboardId: string | BillboardData;
}

export interface Category {
  message: string;
  categories: CategoryData[];
}

export interface IndividualCategory {
  message: string;
  category: CategoryData;
}

export interface ProductImageData {
  _id: string;
  imageUrls: string[];
  colorId: string | ColorData;
  sizeId: string[] | SizeData[];
}

export interface ProductImage {
  message: string;
  productImage: ProductImageData;
}

export interface SizeData {
  _id: string;
  name: string;
  value: string;
}

export interface Size {
  message: string;
  sizes: SizeData[];
}

export interface ColorData {
  _id: string;
  name: string;
  value: string;
}

export interface Color {
  message: string;
  colors: ColorData[];
}

export interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string | CategoryData;
  sizeId: string | SizeData[];
  colorId: string | ColorData[];
  productImages: string[] | ProductImageData[];
  isFeatured?: boolean;
  isArchived?: boolean;
}

export interface Product {
  message: string;
  products: ProductData[];
}

export interface IndiviualProduct {
  message: string;
  product: ProductData;
}

export interface Cart {
  message: string;
  cart: CartData;
}
