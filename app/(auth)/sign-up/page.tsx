import FetchUser from "@/components/fetch-user";
import AuthForm from "./components/auth-form";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sign Up | Fashion Fusion",
  description:
    "Create your account at Fashion Fusion. Join our community to access exclusive deals, save your favorites, and enjoy a personalized shopping experience.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign Up | Fashion Fusion",
    description:
      "Create your account at Fashion Fusion. Join our community to access exclusive deals, save your favorites, and enjoy a personalized shopping experience.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Fashion Fusion",
    description:
      "Create your account at Fashion Fusion. Join our community to access exclusive deals, save your favorites, and enjoy a personalized shopping experience.",
    images: ["/logo.png"],
  },
};
const SignUp = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col gap-6 items-center justify-center">
        <div className="logo"></div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-tight">
          Create Your Account
        </h1>
        <AuthForm />
      </div>
      <FetchUser />
    </>
  );
};

export default SignUp;
