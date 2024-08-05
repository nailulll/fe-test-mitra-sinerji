import api from "@/config/api";
import { Product } from "@/types";
import { AxiosError } from "axios";

const getAll = async () => {
  try {
    const response = await api.get<Product[]>("/barang");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    }
  }
};

export default { getAll };
