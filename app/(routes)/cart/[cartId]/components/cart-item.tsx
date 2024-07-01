"use client";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { ColorData, ProductData, ProductImageData, SizeData } from "@/types";
import { CartProduct, useCart } from "@/zustand/cart";
import { useUser } from "@/zustand/user";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CartItemProps {
  data: CartProduct;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { user } = useUser();
  const { cart, setCart } = useCart();
  const router = useRouter();

  const onRemove = () => {
    if (!user?._id) return;
    axios
      .patch(`/cart/${user._id}/remove`, {
        colorId: (data.colorId as ColorData)._id,
        sizeId: (data.sizeId as SizeData)._id,
        productId: (data.productId as ProductData)._id,
      })
      .then((res) => {
        // console.log(res.data);
        toast.success("Product removed from cart");
        setCart(res.data.cart);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Link href={`/product/${(data.productId as ProductData)._id}`}>
          <Image
            fill
            src={
              (
                (data.productId as ProductData)
                  .productImages[0] as ProductImageData
              ).imageUrls[0]
            }
            alt="Product Image"
            className="object-cover object-center"
          />
        </Link>
      </div>
      <div className="relative ml-4 flex flex-col flex-1 justify-between sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton onClick={onRemove} icon={<X size={18} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <Link href={`/product/${(data.productId as ProductData)._id}`}>
              <p className="text-lg font-semibold text-black">
                {(data.productId as ProductData).name}
              </p>
            </Link>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{(data.colorId as ColorData).name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-300 pl-4">
              {(data.sizeId as SizeData).name}
            </p>
          </div>
          <Link href={`/product/${(data.productId as ProductData)._id}`}>
            <Currency value={(data.productId as ProductData).price} />
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
