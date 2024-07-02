import clsx from "clsx";
import Button from "@/components/button";
import Link from "next/link";
import { X } from "lucide-react";
import { Fragment } from "react";
import { UserData } from "@/zustand/user";
import { ProfileOptions } from "./ui/profile-options";
import { Dialog, Transition } from "@headlessui/react";
import { useParams, usePathname } from "next/navigation";
import { CategoryData } from "@/types";
import IconButton from "./ui/icon-button";
import CartButton from "./ui/cart-button";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  categories: CategoryData[];
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  user,
  categories,
}) => {
  const pathname = usePathname();
  const routes = categories.map((route) => ({
    href: `/category/${route._id}`,
    label: route.name,
    active: pathname == `/category/${route._id}`,
  }));
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed pointer-events-none inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="h-full flex flex-col justify-between bg-white overflow-y-auto py-5 shadow-xl">
                      <div className="px-4 sm:px-6 h-full flex flex-col justify-between gap-6">
                        <div>
                          <div className="flex items-start justify-end">
                            <div className="ml-3 flex h-7 items-center">
                              <IconButton
                                icon={<X size={15} onClick={onClose} />}
                                name="Close Panel"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-xl font-semibold text-black mb-2 underline">
                              Categories
                            </h3>
                            {routes.map((route) => (
                              <Link
                                key={route.label}
                                href={route.href}
                                onClick={onClose}
                                className={clsx(
                                  "text-base capitalize pb-2 pt-3 rounded pl-2 text-foreground border-b border-border hover:bg-gray-100/90 transition-all tracking-wider",
                                  route.active ? "bg-muted" : ""
                                )}
                              >
                                {route.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          {user && <CartButton onClose={onClose} />}
                          <ProfileOptions user={user} onClose={onClose} />
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MenuDrawer;
