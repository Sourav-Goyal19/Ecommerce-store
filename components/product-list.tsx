import { ProductData } from "@/types";
import NoResults from "./ui/noresults";
import Image from "next/image";
import { IndianRupee } from "lucide-react";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
  title: string;
  items: ProductData[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length <= 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
