"use client";

import Button from "@/components/ui/button";
import { ColorData, SizeData } from "@/types";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface MobileFiltersProps {
  sizes?: SizeData[];
  colors?: ColorData[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-2 lg:hidden">
        <Plus size={20} /> Filters
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        as="div"
        className="relative z-40 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="ml-auto max-w-xs w-full h-full relative flex flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} onClick={onClose} />} />
            </div>
            <div className="p-4">
              <Filter
                name="Colors"
                valueKey="colorId"
                data={colors as ColorData[]}
              />
              <Filter
                name="Sizes"
                valueKey="sizeId"
                data={sizes as SizeData[]}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
