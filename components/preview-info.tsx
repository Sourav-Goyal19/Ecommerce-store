import { ProductData } from "@/types";
import Currency from "./ui/currency";

interface PreviewInfoProps {
  data: ProductData;
}

const PreviewInfo: React.FC<PreviewInfoProps> = ({ data }) => {
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
      </div>
      <hr className="my-4" />
      <div className="mt-6">
        <p className="text-lg tracking-wide text-gray-500 line-clamp-[7]">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default PreviewInfo;
