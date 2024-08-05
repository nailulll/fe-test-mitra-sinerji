import api from "@/config/api";
import { formSchema } from "@/lib/validations/form-schema";
import { Transaction } from "@/types";
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

const getAll = async () => {
  try {
    const response = await api.get<Transaction[]>("/transactions");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    }
  }
};

const findOne = async (code: string) => {
  try {
    const response = await api.get<Transaction>(`/transactions/${code}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        window.location.href = "/";
      }
      throw new Error(error.message);
    }
  }
};

export default { create, getAll, findOne };
