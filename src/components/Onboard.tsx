"use client";

import { Form } from "@/components/ui/form";
import { SignUpSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomInput } from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { storeBusiness } from "@/app/actions/businessActions";
import { toast } from "sonner";

export const Onboard = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [show, setShow] = useState<{ password: boolean; cfPassword: boolean }>({
    password: false,
    cfPassword: false,
  });

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof SignUpSchema>) => {
    console.log(values);
    startTransition(async () => {
      if (!values.email || !values.password) {
        toast.error("Error", { description: "Fields cannot be empty!" });
      }

      if (pathname === "/") {
        const userData = {
          ...values,
          industry: values.industry,
          businessName: values.businessName,
          businessType: values.businessType,
          currency: values.currency,
          country: values.country,
          createPin: values.createPin,
          confirmPassword: values.confirmPassword,
        };

        if (userData.password !== userData.confirmPassword) {
          toast.error("Error", { description: "Passwords do not match!" });
          return;
        }
        console.log({ userData });
        await storeBusiness({ email: userData.email });
        router.push("/transaction");
        toast.success("Success", {
          description: "Account created successfully",
        });

        form.reset();
      }

      const userData = {
        email: values.email,
        password: values.password,
      };
      console.log({ userData });
      await storeBusiness({ email: userData.email });
      toast.success("Success", {
        description: "Login successfully",
      });

      router.push("/transaction");
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="border rounded-md shadow-md p-4 mt-3"
      >
        <div className="flex flex-col gap-4 w-[335px] md:w-[500px]">
          <p className="text-xl font-semibold text-center">
            {pathname === "/" ? "Sign Up" : "Sign In"}
          </p>

          {pathname === "/" && (
            <>
              <CustomInput
                label="Business Name"
                control={form.control}
                name="businessName"
                placeholder="enter business name"
              />

              <CustomInput
                label="Industry"
                control={form.control}
                name="industry"
                placeholder="enter industry"
              />

              <CustomInput
                label="Business Type"
                control={form.control}
                name="businessType"
                placeholder="enter business type"
              />

              <CustomInput
                label="Country"
                control={form.control}
                name="country"
                placeholder="enter country"
              />

              <CustomInput
                label="Currency"
                control={form.control}
                name="currency"
                placeholder="enter currency"
              />
            </>
          )}

          <CustomInput
            label="Email"
            control={form.control}
            name="email"
            placeholder="enter email"
          />

          <CustomInput
            label="Password"
            control={form.control}
            name="password"
            placeholder="enter password"
            show={show.password}
            handleShow={() =>
              setShow(prev => ({
                ...prev,
                password: !prev.password,
              }))
            }
          />

          {pathname === "/" && (
            <>
              <CustomInput
                label="Confirm Password"
                control={form.control}
                name="confirmPassword"
                placeholder="retype confirm password"
                show={show.cfPassword}
                handleShow={() =>
                  setShow(prev => ({
                    ...prev,
                    cfPassword: !prev.password,
                  }))
                }
              />

              <CustomInput
                label="Create Pin"
                control={form.control}
                name="createPin"
                placeholder="enter pin"
              />
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <Button className="px-6" type="submit" disabled={isPending}>
            {pathname === "/" ? "Sign Up" : "Sign In"}
          </Button>

          <p className="text-center mt-2 text-sm">
            {pathname == "/" ? "Have an account?" : "Don't have an account?"}{" "}
            <Link
              href={pathname === "/" ? "/sign-in" : "/"}
              className="text-blue-600 hover:text-blue-400 hover:underline hover:underline-offset-2"
            >
              {pathname === "/" ? "Login" : "Register"}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
