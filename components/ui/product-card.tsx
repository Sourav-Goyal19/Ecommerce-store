"use client";

import { ProductData, ProductImageData } from "@/types";
import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import IconButton from "./icon-button";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { usePreviewStoreModal } from "@/zustand/preview-modal";
import { MouseEventHandler } from "react";
import axios from "axios";
import { useUser } from "@/zustand/user";
import mongoose, { set } from "mongoose";
import toast from "react-hot-toast";
import { useCart } from "@/zustand/cart";

interface ProductCardProps {
  data: ProductData;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { user } = useUser();
  const { setCart } = useCart();
  const router = useRouter();
  const { onOpen } = usePreviewStoreModal();

  const handleClick = () => {
    router.push(`/product/${data._id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!user?._id) return router.push("/sign-in");
    if (!mongoose.Types.ObjectId.isValid(data._id)) return;

    // console.log(data.productImages[0] as ProductImageData);

    axios
      .post(`/cart/${user._id}/add`, {
        productId: data._id,
        colorId: (data.productImages[0] as ProductImageData).colorId,
        sizeId: (data.productImages[0] as ProductImageData).sizeId[0],
        quantity: 1,
      })
      .then((res) => {
        // console.log(res.data);
        setCart(res.data.cart);
        toast.success("Item added to cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      onClick={handleClick}
      key={data._id}
      className="bg-white rounded-xl group shadow-md overflow-hidden cursor-pointer border p-3 space-y-4"
    >
      <div className="aspect-square bg-gray-100 rounded-xl relative">
        <div className="group">
          <Image
            src={(data.productImages[0] as ProductImageData).imageUrls[0]}
            alt={data.name}
            fill
            className="aspect-square object-cover rounded-md group-hover:hidden"
          />
          {(data.productImages[0] as ProductImageData).imageUrls[1] && (
            <Image
              src={(data.productImages[0] as ProductImageData).imageUrls[1]}
              alt={data.name}
              fill
              className="aspect-square hidden object-cover rounded-md group-hover:block"
            />
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
