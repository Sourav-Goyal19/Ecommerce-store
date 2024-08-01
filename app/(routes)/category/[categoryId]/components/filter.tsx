"use client";

import { ColorData, SizeData } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  name: string;
  valueKey: string;
  data: (SizeData | ColorData)[];
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
  // console.log(data);
  // console.log(selectedValue);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] == id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {data.map((filter) => (
          <div key={filter._id} className="flex items-center">
            <button
              onClick={() => onClick(filter._id)}
              className="rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 px-5 py-3 disabled:cursor-not-allowed disabled:opacity-75 font-semibold hover:opacity-75 "
              style={{
                backgroundColor:
                  selectedValue == filter._id ? "black" : "white",
                color: selectedValue == filter._id ? "white" : "black",
              }}
            >
              {filter.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
