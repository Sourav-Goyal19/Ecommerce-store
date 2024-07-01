import { Metadata, ResolvingMetadata } from "next";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import {
  CategoryData,
  IndiviualProduct,
  ProductData,
  ProductImageData,
} from "@/types";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import ProductClient from "./components/product-client";
import FetchUser from "@/components/fetch-user";

export const revalidate = 0;

type Props = {
  params: { productId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!mongoose.Types.ObjectId.isValid(params.productId)) {
    return {
      title: "Product Not Found",
    };
  }

  const fetchedProduct: IndiviualProduct = await getProduct(params.productId);
  const product: ProductData = fetchedProduct.product;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      images:
        product.productImages && product.productImages.length > 0
          ? typeof product.productImages[0] === "string"
            ? [product.productImages[0], ...previousImages]
            : [
                (product.productImages[0] as ProductImageData).imageUrls[0],
                ...previousImages,
              ]
          : [...previousImages],
    },
  };
}

const ProductPage = async ({ params }: Props) => {
  if (!mongoose.Types.ObjectId.isValid(params.productId)) {
    return redirect("/");
  }

  const fetchedProduct = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: (fetchedProduct.product.categoryId as CategoryData)._id,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="py-10 px-4 sm:px-6 lg:px-8">
          <ProductClient fetchedProduct={fetchedProduct} />
          <hr className="my-10" />
          <ProductList
            title="Related Items"
            items={suggestedProducts.products}
          />
        </div>
      </Container>
      <FetchUser />
    </div>
  );
};

export default ProductPage;
