import api from "@/config/api";
import { formSchema } from "@/lib/validations/form-schema";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

const create = async (values: z.infer<typeof formSchema>) => {
  try {
    await api.post("/transactions", {
      ...values,
      date: values.date.toISOString(),
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        toast.error("Failed to create transaction");
      }
      if (error.response?.status === 404) {
        toast.error("Customer not found");
      }
    }
  }
};

export default { create };
