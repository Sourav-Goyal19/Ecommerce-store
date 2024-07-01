"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import GalleryTab from "./gallery-tab";
import { ProductImageData } from "@/types";

interface GalleryProps {
  productImage: ProductImageData;
}

const Gallery: React.FC<GalleryProps> = ({ productImage }) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? productImage.imageUrls.length - 1 : prevIndex - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prevIndex) =>
          prevIndex === productImage.imageUrls.length - 1 ? 0 : prevIndex + 1
        );
      }
    },
    [productImage.imageUrls.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !zoomImageRef.current) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = imageContainerRef.current;

    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    zoomImageRef.current.style.transformOrigin = `${x}% ${y}%`;
  }, []);

  return (
    <div className="flex flex-col items-start gap-6">
      <div
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        className="aspect-square h-full w-full relative overflow-hidden rounded-md sm:rounded-lg group"
      >
        <Image
          ref={zoomImageRef}
          src={productImage.imageUrls[activeIndex]}
          alt={`Product image ${activeIndex + 1}`}
          fill
          className="object-cover object-center group-hover:scale-[2.5] transition duration-300 ease-in"
        />
      </div>
      <div className="grid grid-cols-4 w-full gap-6 p-2 ">
        {productImage.imageUrls.map((url, index) => (
          <GalleryTab
            key={url}
            image={url}
            selected={index === activeIndex}
            setActiveIndex={setActiveIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
