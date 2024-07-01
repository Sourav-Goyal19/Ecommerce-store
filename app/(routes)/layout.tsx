import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ModalProvider />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomePageLayout;
