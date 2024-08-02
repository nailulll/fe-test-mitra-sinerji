import { API_URL } from "@/env";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 500) {
      toast("Server error, please try again later");
    }
    if (error.response?.status === 502) {
      toast("Bad gateway, please try again later");
    }
    if (error.response?.status === 503) {
      toast("Service unavailable, please try again later");
    }
    if (error.response?.status === 504) {
      toast("Gateway timeout, please try again later");
    }
    if (error.response?.status === 429) {
      toast("Too many requests, please try again later");
    }
    return Promise.reject(error);
  }
);

export default api;
