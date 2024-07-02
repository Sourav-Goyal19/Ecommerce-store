import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import MobileNavbar from "./ui/mobile-navbar";

export const revalidate = 0;

const Navbar = async () => {
  const fetchedCategories = await getCategories();
  return (
    <header className="border-b sticky inset-x-0 top-0 z-[50] bg-white">
      <Container>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link
            href="/"
            className="ml-4 flex lg:ml-0 gap-x-2 whitespace-nowrap"
          >
            <p className="font-bold text-xl">Fashion Fusion</p>
          </Link>
          <MobileNavbar categories={fetchedCategories.categories} />
          <div className="hidden lg:flex lg:items-center lg:w-full">
            <MainNav data={fetchedCategories?.categories} />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
