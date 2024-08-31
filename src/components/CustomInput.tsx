"use client";

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schema";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

interface CustomInputProps {
  control: Control<z.infer<typeof SignUpSchema>>;
  name: FieldPath<z.infer<typeof SignUpSchema>>;
  label: string;
  placeholder: string;
  show?: boolean;
  handleShow?: () => void;
  disabled?: boolean;
}

export const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  show,
  handleShow,
  disabled,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn("flex items-center gap-1.5 w-full")}>
          <FormLabel
            className={cn(
              "text-sm md:text-base w-[170px] text-gray-700 relative font-semibold"
            )}
          >
            {label}
          </FormLabel>

          <div className={cn("flex w-full flex-col")}>
            <FormControl>
              {name === "confirmPassword" || name === "password" ? (
                <div
                  className={cn("flex justify-between items-center relative")}
                >
                  <Input
                    id={name}
                    placeholder={placeholder}
                    className={cn(
                      "input-text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500 pr-[44px] tracking-widest"
                    )}
                    type={show ? "text" : "password"}
                    {...field}
                  />

                  <div
                    className="w-[18px] h-[18px] absolute right-3"
                    onClick={handleShow}
                  >
                    {show ? (
                      <Eye className="w-[18px] h-[18px] cursor-pointer" />
                    ) : (
                      <EyeOff className="w-[18px] h-[18px] cursor-pointer" />
                    )}
                  </div>
                </div>
              ) : (
                <Input
                  id={name}
                  placeholder={placeholder}
                  className={cn(
                    "input-text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                  )}
                  type="text"
                  {...field}
                  disabled={disabled}
                />
              )}
            </FormControl>

            <FormMessage className="text-12 text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};
