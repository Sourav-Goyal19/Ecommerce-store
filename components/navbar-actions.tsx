"use client";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import CustomButton from "@/components/button";
import { ShoppingBag } from "lucide-react";
import { useUser } from "@/zustand/user";
import Link from "next/link";
import { useCart } from "@/zustand/cart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [isMounted, setlsMounted] = useState(false);
  const { user } = useUser();
  const { cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setlsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {user ? (
        <>
          <Button
            onClick={() => cart?._id && router.push(`/cart/${cart._id}`)}
            className="flex items-center rounded-full bg-black px-4 py-2"
          >
            <ShoppingBag size={20} color="white" />
            <span className="ml-2 text-white text-sm font-medium">
              {cart?.products.length}
            </span>
          </Button>
          <p className="text-base font-semibold"> {user.name}</p>
        </>
      ) : (
        <CustomButton
          secondary
          className="shadow-md rounded-xl hover:border-white transition-all"
        >
          <Link href={"/sign-in"}>Sign In</Link>
        </CustomButton>
      )}
    </div>
  );
};

export default NavbarActions;
