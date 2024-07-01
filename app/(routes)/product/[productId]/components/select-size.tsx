"use client";
import { SizeData } from "@/types";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SelectSizeProps {
  data: SizeData[];
  activeSizeIndex: number;
  setActiveSizeIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SelectSize: React.FC<SelectSizeProps> = ({
  data,
  setActiveSizeIndex,
  activeSizeIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sizeRef.current &&
        !sizeRef.current.contains(event.target as Node) &&
        !sizeDropdownRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-20 flex flex-col gap-4">
      <div
        ref={sizeRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 text-lg rounded p-2 text-center text-black font-semibold flex items-center justify-center cursor-pointer"
      >
        {data[activeSizeIndex].value} <ChevronDown size={20} className="ml-1" />
      </div>
      <div
        ref={sizeDropdownRef}
        className={clsx(
          "absolute top-11 inset-x-0 bg-gray-100 text-gray-900 rounded-sm translate-y-1 transition flex flex-col p-1 max-h-48 overflow-y-auto custom-scrollbar custom-scroll z-50",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-1 pointer-events-none"
        )}
      >
        {data.map((item, index) => (
          <button
            key={item._id}
            className={clsx(
              "text-black rounded text-lg p-1 py-2 font-semibold hover:bg-gray-300",
              activeSizeIndex == index && "bg-gray-300"
            )}
            onClick={() => {
              setActiveSizeIndex(index);
              setIsOpen(false);
            }}
          >
            {item.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectSize;
