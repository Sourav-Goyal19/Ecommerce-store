import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import { BillboardData, CategoryData } from "@/types";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import Filter from "./components/filter";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/noresults";
import MobileFilters from "./components/mobile-filters";
import FetchUser from "@/components/fetch-user";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!mongoose.Types.ObjectId.isValid(params.categoryId)) {
    return {
      title: "Category Not Found",
      description: "The requested category does not exist.",
    };
  }

  const fetchedCategory = await getCategory(params.categoryId);

  if (!fetchedCategory.category) {
    return {
      title: "Category Not Found",
      description: "The requested category does not exist.",
    };
  }

  const category: CategoryData = fetchedCategory.category;
  const billboard = category.billboardId as BillboardData;

  return {
    title: `${category.name} | Fashion Fusion`,
    description: `Explore our collection of ${category.name} at Fashion Fusion. Find the latest trends and styles in ${category.name} for all occasions.`,
    openGraph: {
      title: `${category.name} | Fashion Fusion`,
      description: `Explore our collection of ${category.name} at Fashion Fusion. Find the latest trends and styles in ${category.name} for all occasions.`,
      images: [billboard.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Fashion Fusion`,
      description: `Explore our collection of ${category.name} at Fashion Fusion. Find the latest trends and styles in ${category.name} for all occasions.`,
      images: [billboard.imageUrl],
    },
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  if (!mongoose.Types.ObjectId.isValid(params.categoryId)) {
    redirect("/");
  }

  const fetchedProducts = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const fetchedSizes = await getSizes();
  const fetchedColors = await getColors();
  const fetchedCategory = await getCategory(params.categoryId);

  if (!fetchedCategory.category) {
    redirect("/");
  }

  const sizeMap = new Map();
  fetchedSizes.sizes.forEach((size) => {
    sizeMap.set(size.value, size);
  });
  const formattedSizes = Array.from(sizeMap.values());

  const colorMap = new Map();
  fetchedColors.colors.forEach((color) => {
    colorMap.set(color.value, color);
  });
  const formattedColors = Array.from(colorMap.values());

  //console.log(fetchedCategory);
  console.log(fetchedProducts);

  return (
    <div className="bg-white">
      <Container>
        <Billboard
          data={fetchedCategory.category.billboardId as BillboardData}
        />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-5">
            <MobileFilters sizes={formattedSizes} colors={formattedColors} />
            <div className="hidden lg:block">
              <Filter valueKey="colorId" name="Colors" data={formattedColors} />
              <Filter valueKey="sizeId" name="Sizes" data={formattedSizes} />
            </div>
            <div className="mt-6 last:col-span-4 lg:mt-0">
              {!fetchedProducts.products ? (
                <NoResults />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-4">
                  {fetchedProducts.products.map((item) => (
                    <ProductCard key={item._id} data={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <FetchUser />
    </div>
  );
};

export default CategoryPage;
