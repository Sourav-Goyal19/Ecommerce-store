"use client";
import { useCart } from "@/zustand/cart";
import clsx from "clsx";
import { Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({
  children,
  className,
  onClose,
  ...props
}) => {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <button
      {...props}
      onClick={() => {
        cart?._id && router.push(`/cart/${cart._id}`);
        onClose();
      }}
      className={clsx(
        "bg-gray-900 text-white rounded-md px-4 py-3 font-semibold flex items-center gap-2 hover:opacity-85 transition justify-center text-base text-center",
        className
      )}
    >
      <ShoppingBag size={20} color="white" /> Cart
      <span className="text-white font-medium">{cart?.products.length}</span>
    </button>
  );
};

export default CartButton;
