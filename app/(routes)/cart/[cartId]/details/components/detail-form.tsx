"use client";

import Button from "@/components/button";
import Input from "@/components/ui/input";
import { useCheckoutStore } from "@/zustand/checkoutStore";
import { useUser } from "@/zustand/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const DetailFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setCustomerDetails = useCheckoutStore(
    (state) => state.setCustomerDetails
  );
  const { user } = useUser();
  const customerDetails = useCheckoutStore((state) => state.customerDetails);
  const router = useRouter();
  const params = useParams();

  const formValueTypes = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email address"),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Mobile number must contain only digits")
      .length(10, "Phone number must be exactly 10 digits"),
    street: z
      .string()
      .trim()
      .min(10, "Minimum 10 characters street address is required"),
    city: z.string().trim().min(3, "Minimum 3 character city is required"),
    state: z.string().trim().min(1, "State is required"),
    pincode: z
      .string()
      .trim()
      .min(1, "Pincode is required")
      .regex(/^\d+$/, "Pincode must contain only digits")
      .length(6, "Pincode must be exactly be exactly 6 digits"),
    nearby: z.string().trim().optional(),
  });

  type FormFields = z.infer<typeof formValueTypes>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm<FormFields>({
    defaultValues: {
      name: customerDetails?.name || "",
      email: customerDetails?.email || "",
      phone: customerDetails?.phone || "",
      street: customerDetails?.street || "",
      city: customerDetails?.city || "",
      state: customerDetails?.state || "",
      pincode: customerDetails?.pincode || "",
      nearby: customerDetails?.nearby || "",
    },
    resolver: zodResolver(formValueTypes),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    if (!user?._id) return;
    setIsLoading(true);

    axios
      .post("/address/add", {
        ...data,
        customerId: user?._id,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setCustomerDetails(data);
    router.push(`/cart/${params.cartId}/checkout`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-6">
          <Input
            id="name"
            type="text"
            label="Name"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your Name"
            onChange={() => clearErrors("name")}
          />

          <Input
            id="phone"
            type="text"
            label="Phone Number"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your Mobile Number"
            onChange={() => clearErrors("phone")}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your Email"
            onChange={() => clearErrors("email")}
          />

          <Input
            id="street"
            type="text"
            label="Address Line"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your Street"
            onChange={() => clearErrors("street")}
          />

          <Input
            id="city"
            type="text"
            label="City"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your City"
            onChange={() => clearErrors("city")}
          />

          <Input
            id="state"
            type="text"
            label="State"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your State"
            onChange={() => clearErrors("state")}
          />

          <Input
            id="pincode"
            type="text"
            label="Pincode"
            register={register}
            errors={errors}
            required={true}
            disabled={isLoading}
            placeholder="Enter Your Pincode"
            onChange={() => clearErrors("pincode")}
          />
          <Input
            id="nearby"
            type="text"
            label="Nearby"
            register={register}
            errors={errors}
            required={false}
            disabled={isLoading}
            placeholder="Nearby Location"
            onChange={() => clearErrors("nearby")}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default DetailFormPage;
