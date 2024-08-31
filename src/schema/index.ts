import { z } from "zod";

export const SignUpSchema = z.object({
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  confirmPassword: z
    .string()
    .min(8, { message: "password must be at least 8 characters long." })
    .optional(),
  country: z.string().optional(),
  createPin: z.string().optional(),
  currency: z.string().optional(),
  email: z.string().email(),
  industry: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters long." }),
});
