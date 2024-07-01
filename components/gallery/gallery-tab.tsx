import clsx from "clsx";
import Image from "next/image";
import { SetStateAction } from "react";

interface GalleryTabProps {
  image: string;
  selected?: boolean;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image,
  selected,
  index,
  setActiveIndex,
}) => {
  return (
    <div
      onClick={() => {
        setActiveIndex(index);
      }}
      className={clsx(
        "relative aspect-square flex cursor-pointer items-center justify-center rounded-md bg-white ring-2 ring-offset-2",
        selected ? "ring-black" : "ring-transparent"
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        className="object-cover rounded-md object-center"
      />
    </div>
  );
};

export default GalleryTab;
