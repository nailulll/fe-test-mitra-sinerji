import { z } from "zod";

export const formSchema = z.object({
  date: z.date(),
  customer: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
  test: z.string(),
});
