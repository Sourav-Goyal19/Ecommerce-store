import { create } from "zustand";
import { CartData } from "@/zustand/cart";

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  nearby?: string;
};

type CheckoutStore = {
  cartData: CartData | null;
  customerDetails: CustomerDetails | null;
  setCartData: (data: CartData) => void;
  setCustomerDetails: (data: CustomerDetails) => void;
  clearCheckoutData: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  cartData: null,
  customerDetails: null,
  setCartData: (data) => set({ cartData: data }),
  setCustomerDetails: (data) => set({ customerDetails: data }),
  clearCheckoutData: () => set({ cartData: null, customerDetails: null }),
}));
