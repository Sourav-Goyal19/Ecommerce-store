import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Currency from "./ui/currency";
import Image from "next/image";
import clsx from "clsx";
import SelectSize from "@/app/(routes)/product/[productId]/components/select-size";
import { UserData } from "@/zustand/user";
import { ShoppingCart } from "lucide-react";
import { CartData } from "@/zustand/cart";
import { ColorData, ProductData, ProductImageData, SizeData } from "@/types";

interface InfoProps {
  data: ProductData;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeSizeIndex: number;
  setActiveSizeIndex: React.Dispatch<React.SetStateAction<number>>;
  user: UserData | null;
  setCart: (data: CartData) => void;
}

const Info: React.FC<InfoProps> = ({
  data,
  activeIndex,
  setActiveIndex,
  user,
  activeSizeIndex,
  setActiveSizeIndex,
  setCart,
}) => {
  const sizes: SizeData[] = (data.productImages as ProductImageData[])[
    activeIndex
  ].sizeId as SizeData[];

  const onAddToCart = () => {
    if (!user?._id) return;

    axios
      .post(`/cart/${user?._id}/add`, {
        productId: data._id,
        quantity: 1,
        colorId: (
          (data.productImages as ProductImageData[])[activeIndex]
            .colorId as ColorData
        )._id,
        sizeId: (
          (data.productImages as ProductImageData[])[activeIndex].sizeId[
            activeSizeIndex
          ] as SizeData
        )._id,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Item added to cart");
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-col items-start justify-between gap-3">
          <h1 className="text-3xl font-bold capitalize text-gray-900">
            {data.name}
          </h1>
          <p className="text-2xl text-gray-900">
            <Currency value={data.price} />
          </p>
        </div>
        {user ? (
          <button
            onClick={onAddToCart}
            className={clsx(
              "bg-gray-900 text-white rounded-md px-4 py-3 font-semibold flex items-center gap-2 hover:opacity-75 transition"
            )}
          >
            Add To Cart
            <ShoppingCart size={18} color="white" />
          </button>
        ) : (
          <Link
            href={"/sign-in"}
            className={clsx(
              "bg-gray-900 text-white rounded-md px-4 py-3 font-semibold flex items-center gap-2 hover:opacity-75 transition"
            )}
          >
            Add To Cart
          </Link>
        )}
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Size:</h3>
        <SelectSize
          data={sizes}
          activeSizeIndex={activeSizeIndex}
          setActiveSizeIndex={setActiveSizeIndex}
        />
      </div>
      <div className="mt-6">
        <p className="text-lg tracking-wide text-gray-500">
          {data.description}
        </p>
      </div>
      <div className="mt-6 flex flex-col justify-center gap-y-2">
        <h3 className="font-semibold text-black">Color:</h3>
        <div className="grid grid-cols-3 z-40 gap-4 w-[50%] p-2">
          {(data.productImages as ProductImageData[]).map((image, index) => (
            <div
              key={image._id}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                "rounded-md relative aspect-square p-1 z-40 overflow-hidden border cursor-pointer ring-2 ring-offset-2",
                activeIndex === index ? "ring-black" : "ring-transparent"
              )}
            >
              <Image
                src={image.imageUrls[0]}
                alt={data.name}
                fill
                className="object-cover rounded-md z-40"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
