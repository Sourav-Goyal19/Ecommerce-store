import getCart from "@/actions/get-cart";
import Container from "@/components/ui/container";
import mongoose from "mongoose";
import CartItem from "./components/cart-item";
import FetchUser from "@/components/fetch-user";
import Summary from "./components/summary";
import { redirect } from "next/navigation";
import { CartData, CartProduct } from "@/zustand/cart";
import { ColorData, ProductData, ProductImageData } from "@/types";
import CartDataInitializer from "./components/cart-data-intializer";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Your Shopping Cart | Fashion Fusion",
  description:
    "Review and manage items in your shopping cart at Fashion Fusion. Secure checkout and easy shopping experience for all your fashion needs.",
  openGraph: {
    title: "Your Shopping Cart | Fashion Fusion",
    description:
      "Review and manage items in your shopping cart at Fashion Fusion. Secure checkout and easy shopping experience for all your fashion needs.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Shopping Cart | Fashion Fusion",
    description:
      "Review and manage items in your shopping cart at Fashion Fusion. Secure checkout and easy shopping experience for all your fashion needs.",
    images: ["/logo.png"],
  },
};

const CartPage = async ({ params }: { params: { cartId: string } }) => {
  if (!mongoose.Types.ObjectId.isValid(params.cartId)) {
    redirect("/");
  }

  const fetchedCart = await getCart(params.cartId);

  let formattedCart: CartData | undefined = undefined;

  if (fetchedCart?.cart?.products) {
    const formattedProducts = (fetchedCart.cart.products as CartProduct[]).map(
      (item) => {
        const colorId = (item.colorId as ColorData)._id;
        const productData = item.productId as ProductData;
        const matchingImage = (
          productData.productImages as ProductImageData[]
        ).find((image) => image.colorId === colorId);

        return {
          ...item,
          productId: {
            ...productData,
            productImages: matchingImage ? [matchingImage] : [],
          } as ProductData,
        } as CartProduct;
      }
    );

    formattedCart = {
      ...fetchedCart.cart,
      products: formattedProducts,
    };
  }

  return (
    <div className="bg-white">
      {formattedCart && <CartDataInitializer cartData={formattedCart} />}
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl text-black font-bold">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {!fetchedCart?.cart?.products ||
              fetchedCart.cart.products.length <= 0 ? (
                <p className="text-neutral-500">No Items added to cart</p>
              ) : (
                <ul>
                  {formattedCart &&
                    (formattedCart.products as CartProduct[]).map((item) => (
                      <CartItem
                        key={(item.productId as ProductData)._id}
                        data={item}
                      />
                    ))}
                </ul>
              )}
            </div>
            <Summary />
          </div>
        </div>
      </Container>
      <FetchUser />
    </div>
  );
};

export default CartPage;
