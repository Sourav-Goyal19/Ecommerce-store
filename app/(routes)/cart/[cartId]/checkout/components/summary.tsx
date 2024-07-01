"use client";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { ProductData } from "@/types";
import { CartProduct, useCart } from "@/zustand/cart";
import { useUser } from "@/zustand/user";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Summary = () => {
  const params = useParams();
  const { cart } = useCart();
  const { user } = useUser();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!cart?._id) return;
    let price = (cart?.products as CartProduct[])
      .map((item) => (item.productId as ProductData).price * item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    setTotalPrice(price);
  }, [cart]);

  const removeAll = () => {
    axios
      .patch(`/cart/${user?._id}/removeall`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={() => router.push(`${params.cartId}/details`)}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
