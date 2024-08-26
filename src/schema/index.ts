import { z } from "zod";

export const transactionSchema = z.object({
  date: z.date(),
  crAccount: z.string(),
  crAmount: z.string(),
});
