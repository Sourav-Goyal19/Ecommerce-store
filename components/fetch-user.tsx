"use client";

import axios from "axios";
import { useEffect } from "react";
import { useUser } from "@/zustand/user";
import { useCart } from "@/zustand/cart";
import { useCheckoutStore } from "@/zustand/checkoutStore";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const FetchUser = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();
  const setCustomerDetails = useCheckoutStore(
    (state) => state.setCustomerDetails
  );

  useEffect(() => {
    if (user) return;
    (async () => {
      try {
        const res = await axios.get("/customers/me", {
          withCredentials: true,
        });
        if (res.data.customer) {
          console.log(res.data);
          setUser(res.data.customer);
          setCustomerDetails(
            res.data.customer.address[res.data.customer.address.length - 1]
          );
          axios
            .get(`/cart/${res.data.customer._id}`)
            .then((res) => {
              setCart(res.data.cart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return null;
};

export default FetchUser;
