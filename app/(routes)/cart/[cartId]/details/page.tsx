import Container from "@/components/ui/container";
import DetailFormPage from "./components/detail-form";
import FetchUser from "@/components/fetch-user";

const CustomerDetails = () => {
  return (
    <div className="bg-white w-full">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 w-full mb-12">
          <h2 className="text-3xl font-semibold text-black py-8">
            Add Details
          </h2>
          <DetailFormPage />
        </div>
      </Container>
      <FetchUser />
    </div>
  );
};

export default CustomerDetails;
