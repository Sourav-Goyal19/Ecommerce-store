import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const font = Urbanist({ subsets: ["latin"] });

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

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("custom-scroll", font.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
