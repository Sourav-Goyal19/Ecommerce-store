"use client";

import { useEffect, useState } from "react";
import MenuDrawer from "../menu-drawer";
import { CategoryData } from "@/types";
import { useUser } from "@/zustand/user";
import Button from "../button";
import { Menu } from "lucide-react";

interface MobileNavbarProps {
  categories: CategoryData[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        user={user}
        categories={categories}
      />

      <Button
        className="bg-white block lg:hidden ml-auto lg:pointer-events-none text-black border focus:ring-2 focus:ring-black focus:bg-black focus:ring-offset-2 group transition-all hover:bg-black"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5 text-black group-hover:text-white group-focus:text-white transition" />
      </Button>
    </>
  );
};

export default MobileNavbar;
