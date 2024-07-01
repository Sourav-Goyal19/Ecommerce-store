"use client";
import { UserData } from "@/zustand/user";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "../button";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProfileOptionsProps {
  user: UserData | null;
  onClose?: () => void;
}

export const ProfileOptions: React.FC<ProfileOptionsProps> = ({
  user,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const onLogout = () => {
    axios
      .get("/customers/logout")
      .then((res) => {
        toast.success("Logout successfully");
        onClose?.();
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className={clsx(
              "absolute inset-x-0 -top-16 p-2 bg-white border w-full shadow-lg transition-all duration-300 ease-in-out transform rounded-xl",
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            <p
              onClick={onLogout}
              className="text-base transition flex items-center cursor-pointer hover:bg-gray-100/90 rounded-lg py-2 px-2"
            >
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </p>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="border-2 p-3 rounded-xl transition flex items-center justify-center w-full mb-4 gap-3 hover:bg-gray-100/90 cursor-pointer"
          >
            <p className="text-lg font-medium text-center">{user?.name}</p>
          </div>
        </div>
      ) : (
        <Button className="w-full">
          <Link href="/sign-in">Sign-In</Link>
        </Button>
      )}
    </>
  );
};
