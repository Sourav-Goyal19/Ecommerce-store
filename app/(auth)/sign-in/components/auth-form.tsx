"use client";
import Input from "@/components/ui/input";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/zustand/user";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FetchUser from "@/components/fetch-user";
import { useCart } from "@/zustand/cart";
import { useCheckoutStore } from "@/zustand/checkoutStore";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useUser();
  const { setCart } = useCart();
  const router = useRouter();
  const setCustomerDetails = useCheckoutStore(
    (state) => state.setCustomerDetails
  );

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push("/");
    }
  }, [user, router]);

  const formSchema = z.object({
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Mobile number must contain only digits")
      .length(10, "Phone number must be exactly 10 digits"),
    password: z.string().min(1, "Password is required").trim(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      phone: undefined,
      password: undefined,
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post(`/customers/login`, data)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setUser(res.data.customer);
        setCart(res.data.cart);
        setCustomerDetails(
          res.data.customer.address[res.data.customer.address.length - 1]
        );
        router.back();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col p-5 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="phone"
            type="text"
            label="Phone Number"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="Enter your phone number"
            onChange={() => clearErrors("phone")}
          />
          <Input
            id="password"
            type="text"
            label="Password"
            required={true}
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="Enter your password"
            onChange={() => clearErrors("password")}
          />

          <Button type="submit" fullWidth disabled={isLoading}>
            Login
          </Button>
        </form>
        <p className="text-gray-900 font-medium mt-4 text-lg text-center">
          New Here?
          <Link href="/sign-up" className="underline ml-1">
            Create An Account
          </Link>
        </p>
      </div>
      <FetchUser />
    </>
  );
};

export default AuthForm;
