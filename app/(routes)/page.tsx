import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import FetchUser from "@/components/fetch-user";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Fashion Fusion ",
  description:
    "Discover the latest trends in fashion at Fashion Fusion. Shop our curated collection of clothing, accessories, and more for men and women.",
  openGraph: {
    title: "Fashion Fusion ",
    description:
      "Discover the latest trends in fashion at Fashion Fusion. Shop our curated collection of clothing, accessories, and more for men and women.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Fusion",
    description:
      "Discover the latest trends in fashion at Fashion Fusion. Shop our curated collection of clothing, accessories, and more for men and women.",
    images: ["/logo.png"],
  },
};

const HomePage = async () => {
  const fetchedBillboards = await getBillboard("667199fa60871c8308f757f5");
  const fetchedProducts = await getProducts({ isFeatured: true });
  // console.log(fetchedProducts);
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={fetchedBillboards.billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pb-10">
        <ProductList
          title="Trending Products"
          items={fetchedProducts.products || []}
        />
      </div>
      <FetchUser />
    </Container>
  );
};

export default HomePage;
