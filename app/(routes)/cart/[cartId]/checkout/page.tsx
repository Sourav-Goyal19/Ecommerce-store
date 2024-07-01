import FetchUser from "@/components/fetch-user";
import Container from "@/components/ui/container";
import CheckoutClient from "./components/checkout-client";

const CheckoutPage = () => {
  return (
    <div className="bg-white w-full">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 w-full mb-12">
          <h2 className="text-3xl font-semibold text-black py-8">
            Final Checkout
          </h2>
          <CheckoutClient />
        </div>
      </Container>
      <FetchUser />
    </div>
  );
};

export default CheckoutPage;
