import api from "@/config/api";
import { Customer } from "@/types";
import { AxiosError } from "axios";

const getAll = async () => {
  try {
    const response = await api.get<Customer[]>("/customer");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    }
  }
};

export default { getAll };
