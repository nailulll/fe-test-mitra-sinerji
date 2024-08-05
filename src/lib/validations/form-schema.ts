import { z } from "zod";

export const formSchema = z.object({
  date: z.date(),
  customer: z.string().min(1, { message: "Harap pilih customer" }),
  products: z
    .array(
      z.object({
        code: z.string().min(1),
        qty: z.number().min(1),
      })
    )
    .min(1, {
      message: "Harap pilih produk",
    }),
  feeTransport: z.number(),
});
