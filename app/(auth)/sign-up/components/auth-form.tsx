"use client";
import Input from "@/components/ui/input";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/zustand/user";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push("/");
    }
  }, [user, router]);

  const formSchema = z
    .object({
      name: z.string().trim().min(1, "Name is required"),
      phone: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(/^\d+$/, "Mobile number must contain only digits")
        .length(10, "Phone number must be exactly 10 digits"),
      password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type FormValues = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      name: undefined,
      phone: undefined,
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post(`/customers/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setUser(res.data.customer);
        router.push("/sign-in");
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
    <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg max-w-md sm:max-w-lg w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          type="text"
          label="Name"
          required={true}
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="Enter your name"
          onChange={() => clearErrors("name")}
        />
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
        <Input
          id="confirmPassword"
          type="text"
          label="Confirm Password"
          required={true}
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="Enter your password again"
          onChange={() => clearErrors("confirmPassword")}
        />

        <Button type="submit" fullWidth disabled={isLoading}>
          Register
        </Button>
      </form>
      <p className="text-gray-900 font-medium mt-4 text-lg text-center">
        Already Have An Account?
        <Link href="/sign-in" className="underline ml-1">
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
