import FetchUser from "@/components/fetch-user";
import AuthForm from "./components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Fashion Fusion",
  description:
    "Sign in to your Fashion Fusion account. Access your personalized shopping experience, view your orders, and explore exclusive offers.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sign In | Fashion Fusion",
    description:
      "Sign in to your Fashion Fusion account. Access your personalized shopping experience, view your orders, and explore exclusive offers.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | Fashion Fusion",
    description:
      "Sign in to your Fashion Fusion account. Access your personalized shopping experience, view your orders, and explore exclusive offers.",
    images: ["/logo.png"],
  },
};

const Login = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col gap-6 items-center justify-center">
        <div className="logo"></div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-tight">
          Sign Into Your Account
        </h1>
        <AuthForm />
      </div>
      <FetchUser />
    </>
  );
};

export default Login;
