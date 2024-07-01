"use client";

import { ProductData } from "@/types";
import { CartProduct } from "@/zustand/cart";
import { useCheckoutStore } from "@/zustand/checkoutStore";
import CartItem from "../../components/cart-item";
import IconButton from "@/components/ui/icon-button";
import { Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Summary from "./summary";

const CheckoutClient = () => {
  const { cartData, customerDetails } = useCheckoutStore();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!cartData) {
      router.push(`/cart/${params.cartId}`);
    }
    if (!customerDetails) {
      router.push(`/cart/${params.cartId}/details`);
    }
  }, [cartData, router, params, customerDetails]);

  return (
    <div>
      <div className="mt-3 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <div className="lg:col-span-7">
          <div className="bg-gray-50 rounded-lg px-8 py-6 relative mb-8">
            <h2 className="text-2xl font-bold text-black ">Details</h2>
            <hr className="text-gray-500 mt-2 mb-5" />
            <div className="absolute top-4 right-8">
              <IconButton
                onClick={() => router.push(`/cart/${params.cartId}/details`)}
                icon={<Pencil size={18} />}
              />
            </div>
            <div className="flex flex-col item-start space-y-4">
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">Name:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.name}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">Phone:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.phone}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">Email:</p>
                <p className="text-neutral-500 ml-2 truncate">
                  {customerDetails?.email}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">Street:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.street}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">City:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.city}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">State:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.state}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-base text-black font-semibold">Pincode:</p>
                <p className="text-neutral-500 ml-2 capitalize truncate">
                  {customerDetails?.pincode}
                </p>
              </div>
              {customerDetails?.nearby && (
                <div className="flex items-center">
                  <p className="text-base text-black font-semibold">Nearby:</p>
                  <p className="text-neutral-500 ml-2 capitalize truncate">
                    {customerDetails?.nearby}
                  </p>
                </div>
              )}
            </div>
          </div>
          {!cartData?.products || cartData.products.length <= 0 ? (
            <p className="text-neutral-500">No Items added to cart</p>
          ) : (
            <ul>
              {cartData &&
                (cartData.products as CartProduct[]).map((item) => (
                  <CartItem
                    key={(item.productId as ProductData)._id}
                    data={item}
                  />
                ))}
            </ul>
          )}
        </div>
        <Summary />
      </div>
    </div>
  );
};

export default CheckoutClient;
